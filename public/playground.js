const stopProgram = window.stopLang;

const hello = [
    'WRITE "Please enter you name"',
    'WRITE $ci+2',
    'GOTO "END"',
    'ADD "Hello " $stdin',
    '(END) NOOP'
];

const guessTheNumber = [
    'GOTO "MAIN"',
    '(POP) POP',
    '(EJECT) EJECT',
    '(XOR) OR $ci+1 $ci+2 ; Arguments are in $0 and $1',
    'AND $0 $ci+2',
    'AND $1 $ci+2',
    'NOT $1',
    'NOT $0',
    '(SRAND) NOOP $ci+1 $ci+2 $SETXORSTATE',
    'WRITE "Please enter a seed"',
    'PUSH "NOOP" $stdin 2024 16 75829552 ; [x, y, z, w]',
    '(SETXORSTATE) ALTER "XORSTATE" 0',
    '(SWAPTOFRONT) NOOP $COPYBACKFRONT $EJECT',
    '(COPYBACKFRONT) PUSH "NOOP" $-1',
    '(SHIFTXOREQ) ITEM [$ci+1, $XOR, $POP] 1 ; $0 is the value, $1 is the amount to shift',
    'PUSH "NOOP" $ci+1',
    'SHIFT $0 $1',
    '(XORSHIFT) ITEM [$ci+1, $ci+6, $ci+11] 2 ; $XORSTATE should be in $0',
    'NOOP $ci+1 $ci+2 $ci+3 $POP $POP $ci+4 $SWAPTOFRONT $ci+3 $POP $POP $COPYBACKFRONT ; t = x; t ^= t << 11; t ^= >> 8, t is in $0 and $-1',
    'PUSH "NOOP" 11',
    'PUSH "ITEM" $XORSTATE 0',
    'INJECT "NOOP" $SHIFTXOREQ',
    'PUSH "NOOP" -8',
    'NOOP $ci+1 $ci+2 $ci+3 $POP $POP $SWAPTOFRONT $ci+4 $POP $POP ; w ^= w >> 19; w ^= t',
    'PUSH "NOOP" -19',
    'PUSH "ITEM" $XORSTATE 3',
    'INJECT "NOOP" $SHIFTXOREQ',
    'INJECT "NOOP" $XOR',
    'ITEM [$ci+1, $POP, $SWAPTOFRONT, $SETXORSTATE, $EJECT, $EJECT, $ci+4] 6',
    'INJECT "NOOP" $ci+1 $ci+2 $ci+3 $ci+4',
    'ITEM $XORSTATE 1',
    'ITEM $XORSTATE 2',
    'ITEM $XORSTATE 3',
    'NOOP $-1',
    '(WARMUP) NOOP $XORSHIFT $XORSHIFT $XORSHIFT $XORSHIFT $XORSHIFT',
    '(SETGUESS) NOOP $ci+1 $ci+3',
    'PUSH "NOOP" $ci+1',
    'MOD $XORSHIFT 100',
    'ALTER "SECRETE" 0',
    '(ISCORRECT) EQUAL $stdin $SECRETE',
    '(ISYES) EQUAL $stdin "YES"',
    '(MAIN) NOOP $SRAND $WARMUP $SETGUESS',
    'WRITE "I\'m thinking of a number between 0 and 99. What is it?"',
    '(TRYGUESS) GOTO "WIN" $ISCORRECT',
    'WRITE "Enter \\"YES\\" to try again."',
    'GOTO "TRYGUESS" $ISYES',
    'WRITE "Ok. You lose, then! Better luck next time."',
    'GOTO "END"',
    '(WIN) WRITE "That\'s right! Congratulations!"',
    'GOTO "END"',
    '(END) NOOP'
];

const quine = [
    'NOOP [' +
        '"GOTO \\"MAIN\\"", ' +
        '"ASTRING $0", ' +
        '"ADD \\"NOOP \\" $ci-1", ' +
        '"(MAIN) WRITE $ci-1", ' +
        '"PUSH \\"LENGTH\\" $0", ' +
        '"PUSH \\"NOOP\\" 0", ' +
        '"(HASMORE) NEQUAL $0 $1", ' +
        '"(CURRENT) ITEM $2 $0", ' +
        '"(LOOP) WRITE $CURRENT", ' +
        '"INJECT \\"NOOP\\" $ci+1", ' +
        '"ADD $0 1", ' +
        '"POP", ' +
        '"PUSH \\"NOOP\\" $-1", ' +
        '"EJECT", ' +
        '"GOTO \\"LOOP\\" $HASMORE"' +
    ']',
    'GOTO "MAIN"',
    'ASSTRING $0',
    'ADD "NOOP " $ci-1',
    '(MAIN) WRITE $ci-1',
    'PUSH "LENGTH" $0',
    'PUSH "NOOP" 0',
    '(HASMORE) NEQUAL $0 $1',
    '(CURRENT) ITEM $2 $0',
    '(LOOP) WRITE $CURRENT',
    'INJECT "NOOP" $ci+1',
    'ADD $0 1',
    'POP',
    'PUSH "NOOP" $-1',
    'EJECT',
    'GOTO "LOOP" $HASMORE'
];

const fizzbuzz = [
    'WRITE "Enter an upper bound"',
    'PUSH "NOOP" $stdin',
    'PUSH "NOOP" 0',
    '(ISFIZZBUZZ) EQUAL $ci+1 0',
    'MOD $0 15',
    '(ISFIZZ) EQUAL $ci+1 0',
    'MOD $0 3',
    '(ISBUZZ) EQUAL $ci+1 0',
    'MOD $0 5',
    '(HASMORE) NEQUAL $0 $1',
    '(LOOP) INJECT "NOOP" $ci+1',
    'ADD $0 1',
    'POP',
    'PUSH "NOOP" $-1',
    'EJECT',
    '(LOOP) GOTO "FIZZBUZZ" $ISFIZZBUZZ',
    'GOTO "FIZZ" $ISFIZZ',
    'GOTO "BUZZ" $ISBUZZ',
    'WRITE $0',
    '(REPEAT) GOTO "LOOP" $HASMORE',
    'GOTO "END"',
    '(FIZZBUZZ) WRITE "FIZZBUZZ"',
    'GOTO "REPEAT"',
    '(FIZZ) WRITE "FIZZ"',
    'GOTO "REPEAT"',
    '(BUZZ) WRITE "BUZZ"',
    'GOTO "REPEAT"',
    '(END) NOOP'
];

const defaultPrograms = {
    'HELLO': hello,
    'GUESS THE NUMBER': guessTheNumber,
    'FIZZBUZZ': fizzbuzz,
    'QUINE': quine
};

const isDebuggerActive = () => {
    return document.getElementById('editToolbar').
        classList.contains('inactive');
};

const clearOutput = () => {
    const stdout = document.getElementById('stdout');
    const stderror = document.getElementById('stderror');
    const result = document.getElementById('result');
    const instructionPointer = document.getElementById('instructionPointer');
    const currentInstruction = document.getElementById('currentInstruction');
    const instructionCount = document.getElementById('instructionCount');
    const evaluationStack = document.getElementById('evaluationStack');

    stdout.textContent = '';
    stderror.textContent = '';
    result.textContent = '';
    instructionPointer.textContent = '';
    currentInstruction.textContent = '';
    instructionCount.textContent = '';
    evaluationStack.textContent = '';
};

const realStdIn = () => window.prompt('Enter a STOP value:');

const outputToDiv = (v, div) => {
    const value = v + '\n';
    div.textContent += value;
};

const realStdOut = v =>
    outputToDiv(v, document.getElementById('stdout'));

const realStdErr = v =>
    outputToDiv(v, document.getElementById('stderror'));

const onKeyboardInput = e => {
    if (isDebuggerActive()) {
        return;
    }

    const line = e.target.parentElement;
    const root = line.parentElement;
    const previousLine = line.previousElementSibling;
    const nextLine = line.nextElementSibling;
    switch (e.key) {
    case 'ArrowDown':
        if (nextLine) {
            focusLine(nextLine);
        } else {
            insertLine(root);
        }
        break;

    case 'ArrowUp':
        if (previousLine) {
            focusLine(previousLine);
        }
        break;

    case 'Enter':
        insertLine(root, nextLine);
        break;

    case 'Backspace':
    case 'Delete':
        if (!e.target.value) {
            if (e.key === 'Backspace') {
                if (previousLine) {
                    focusLine(previousLine);
                } else if (nextLine) {
                    focusLine(nextLine);
                }
            } else {
                if (nextLine) {
                    focusLine(nextLine);
                } else if (previousLine) {
                    focusLine(previousLine);
                }
            }
            line.remove();
            e.preventDefault();
        }
        break;
    }
};

let currentBreakpoints = [];

const onBreakpointToggle = e => {
    e.target.classList.toggle('enabled');
    const isBreakpoint = e.target.classList.contains('enabled');

    const line = e.target.parentNode;
    const index = Array.from(line.parentNode.childNodes).indexOf(line);
    if (!isBreakpoint) {
        currentBreakpoints = currentBreakpoints.
            filter(pointer => pointer !== index);
    } else {
        currentBreakpoints.push(index);
    }
};

const createLine = (instruction, isBreakpoint, isIp, isCi) => {
    const container = document.createElement('div');
    container.classList.add('line');

    if (isIp) {
        container.classList.add('ip');
    }

    if (isCi) {
        container.classList.add('ci');
    }

    const breakpoint = document.createElement('span');
    breakpoint.classList.add('breakpoint');
    if (isBreakpoint) {
        breakpoint.classList.add('enabled');
    }

    breakpoint.addEventListener('click', onBreakpointToggle);
    container.appendChild(breakpoint);

    const text = document.createElement('input');
    if (instruction) {
        text.value = instruction;
    }

    text.classList.add('text');
    text.addEventListener('keypress', onKeyboardInput);
    container.appendChild(text);

    return container;
};

const getTextFromLine = line => {
    const text = line.getElementsByClassName('text');
    return text[0].value;
};

const focusLine = line => {
    const text = line.getElementsByClassName('text');
    return text[0].focus();
};

const insertLine = (root, insertBefore) => {
    const line = createLine();

    if (insertBefore) {
        root.insertBefore(line, insertBefore);
        focusLine(line);
    } else {
        const lastLine = root.lastElementChild;
        if (lastLine) {
            const text = getTextFromLine(lastLine);
            if (text) {
                root.appendChild(line);
                focusLine(line);
            }
        } else {
            root.appendChild(line);
            focusLine(line);
        }
    }
};

const getInstructions = root => {
    const children = Array.from(root.children);
    return children.
        map(getTextFromLine).
        filter(instruction => instruction);
};

const populateEditor = (root, instructions, breakpoints, ip, ci) => {
    root.textContent = '';

    instructions.forEach((instruction, index) => {
        const lineHasBreakpoint = breakpoints.indexOf(index) !== -1;
        const lineIsIp = index === ip;
        const lineIsCi = index === ci;
        const line = createLine(
            instruction,
            lineHasBreakpoint,
            lineIsIp,
            lineIsCi);

        root.appendChild(line);
    });
};

const disableLines = () => {
    Array.from(document.getElementsByClassName('text')).
        forEach(element => element.disabled = !element.disabled);
};

const newProgram = () => {
    currentBreakpoints = [];

    document.getElementById('programName').value = '';

    const editor = document.getElementById('editor');
    populateEditor(editor, [], currentBreakpoints);
};

const runProgram = () => {
    clearOutput();

    const root = document.getElementById('editor');
    const instructions = getInstructions(root);

    try {
        const program = new stopProgram(
            instructions,
            {
                stdin: realStdIn,
                stdout: realStdOut,
                stderr: realStdErr
            });
        program.go();

        const result = program.currentResult;
        document.getElementById('result').textContent = result;
    } catch (e) {
        realStdErr(e.toString());
    }
};

const displayState = state => {
    document.getElementById('result').textContent =
        state.lastReturnedData;

    document.getElementById('instructionPointer').textContent =
        state.ip;

    document.getElementById('instructionCount').textContent =
        state.instructions.length;

    const evaluationStackList = document.getElementById('evaluationStack');
    const evaluationStack = state.evaluationStack;

    evaluationStackList.textContent = '';

    let currentInstruction = state.ip;
    if (evaluationStack.length > 0) {
        currentInstruction =
            evaluationStack[evaluationStack.length - 1].pointer;

        evaluationStack.forEach(evaluationItem => {
            const li = document.createElement('li');
            li.textContent = evaluationItem.instruction;
            evaluationStackList.insertBefore(
                li,
                evaluationStackList.firstChild);
        });
    }

    const currentInstructionElement =
        document.getElementById('currentInstruction');
    currentInstructionElement.textContent = currentInstruction;

    const editor = document.getElementById('editor');
    populateEditor(
        editor,
        state.instructions,
        currentBreakpoints,
        state.ip,
        currentInstruction);
    disableLines();
};

class Debugger {
    startDebugger(instructions, breakpoints) {
        this.instructions = instructions;
        this.breakpoints = breakpoints;
        currentBreakpoints = breakpoints;

        this.breakNext = false;

        try {
            // Clear out the previous program
            this.program = undefined;
            this.program = new stopProgram(
                instructions,
                {
                    stdin: realStdIn,
                    stdout: realStdOut,
                    stderr: realStdErr,
                    onStateChange:
                        this.onStateChange.bind(this),
                });
            this.program.reset();
        } catch (e) {
            realStdErr(e.toString());
        }
    }

    go() {
        try {
            this.program.go();
            displayState(this.program.state);
        } catch (e) {
            realStdErr(e.toString());
        }
    }

    next() {
        this.breakNext = true;
        this.go();
    }

    reset() {
        this.startDebugger(this.instructions, this.breakpoints);
    }

    onStateChange(newState, oldState) {
        const lastIndexOnNewStack = newState.evaluationStack.length - 1;
        const ci = lastIndexOnNewStack >= 0 ?
            newState.evaluationStack[lastIndexOnNewStack].pointer :
            newState.ip;

        let shouldBreak = false;
        if (this.program) {
            const lastIndex = oldState.evaluationStack.length - 1;
            if (lastIndex >= 0) {
                const executedInstruction =
                    oldState.evaluationStack[lastIndex].instruction;

                if (executedInstruction.name === 'PUSH') {
                    currentBreakpoints = currentBreakpoints.
                        map(breakpoint => breakpoint + 1);
                } else if (executedInstruction.name === 'POP') {
                    currentBreakpoints = currentBreakpoints.
                        map(breakpoint => breakpoint - 1);
                }

                currentBreakpoints = currentBreakpoints.
                    filter(breakpoint =>
                        breakpoint >= 0 &&
                        breakpoint < newState.instructions.length);
            }
        } else {
            shouldBreak = true;
        }

        if (currentBreakpoints.indexOf(ci) !== -1) {
            shouldBreak = true;
        }

        if (this.breakNext) {
            shouldBreak = true;
            this.breakNext = false;
        }

        if (shouldBreak) {
            displayState(newState);
        }

        if (!this.program) {
            this.breakNext = true;
        }

        return shouldBreak;
    }
}

const activeDebugger = new Debugger();

const toggleDebugger = () => {
    clearOutput();

    Array.from(document.getElementsByClassName('debugSwap')).
        forEach(element => element.classList.toggle('inactive'));
};

const debugProgram = () => {
    clearOutput();

    const root = document.getElementById('editor');

    toggleDebugger();
    activeDebugger.startDebugger(
        getInstructions(root),
        currentBreakpoints);
};

const stopDebugger = () => {
    clearOutput();

    const root = document.getElementById('editor');
    currentBreakpoints = activeDebugger.breakpoints;

    toggleDebugger();
    populateEditor(
        root,
        activeDebugger.instructions,
        activeDebugger.breakpoints);
};

const onRootClick = e => {
    if (isDebuggerActive()) {
        return;
    }

    const root = document.getElementById('editor');
    if (e.target === root) {
        insertLine(root);
    }
};

const getProgramNames = () => {
    const programNames = [];
    for (let i = 0; i < localStorage.length; ++i) {
        programNames.push(localStorage.key(i));
    }

    return programNames;
};

const loadSavedPrograms = programSelect => {
    try {
        // Try to use local storage to see if it's available
        localStorage.setItem('test', 1);
        localStorage.removeItem('test');
    } catch (e) {
        // Local storage is probably not available, just hide the buttons
        document.getElementById('programName').classList.add('inactive');
        document.getElementById('save').classList.add('inactive');
        document.getElementById('delete').classList.add('inactive');
        document.getElementById('load').classList.add('inactive');
    }

    for (let i = 1; i < programSelect.options.length; ++i) {
        programSelect.remove(i);
    }

    const programNames = getProgramNames();

    programNames.sort();
    programNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        programSelect.appendChild(option);
    });

    Object.keys(defaultPrograms).forEach(name => {
        const option = document.createElement('option');
        option.value = 'default-' + name;
        option.textContent = name;
        programSelect.appendChild(option);
    });
};

const isDefaultProgram = name =>
    name.startsWith('default-') && (name.substring(8) in defaultPrograms);

const realProgramName = name =>
    isDefaultProgram(name) ? name.substring(8) : name;

const loadProgram = e => {
    const name = e.target.selectedOptions[0].value;
    const instructions = isDefaultProgram(name) ?
        defaultPrograms[realProgramName(name)] :
        JSON.parse(localStorage.getItem(name));

    document.getElementById('programName').value = realProgramName(name);
    currentBreakpoints = [];

    const editor = document.getElementById('editor');
    populateEditor(editor, instructions, currentBreakpoints);
};

const saveProgram = () => {
    const programName = document.getElementById('programName');
    const name = programName.value;

    const editor = document.getElementById('editor');
    const instructions = getInstructions(editor);

    localStorage.setItem(name, JSON.stringify(instructions));

    const programSelect = document.getElementById('load');
    loadSavedPrograms(programSelect);

    const programNames = getProgramNames();
    programSelect.selectedIndex = programNames.indexOf(name);

    programName.value = name;
};

const deleteProgram = () => {
    const programName = document.getElementById('programName');
    const name = programName.value;
    localStorage.removeItem(name);

    const programSelect = document.getElementById('load');
    loadSavedPrograms(programSelect);
    programSelect.selectedIndex = 0;

    programName.value = '';
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('new').addEventListener('click', newProgram);
    document.getElementById('run').addEventListener('click', runProgram);
    document.getElementById('debug').addEventListener('click', debugProgram);
    document.getElementById('stop').addEventListener('click', stopDebugger);
    document.getElementById('go').
        addEventListener('click', () => activeDebugger.go());
    document.getElementById('step').
        addEventListener('click', () => activeDebugger.next());

    const editor = document.getElementById('editor');
    editor.addEventListener('click', onRootClick);

    const programSelect = document.getElementById('load');
    programSelect.selectedIndex = 0;
    programSelect.addEventListener('change', loadProgram);
    loadSavedPrograms(programSelect);

    document.getElementById('save').addEventListener('click', saveProgram);
    document.getElementById('delete').addEventListener('click', deleteProgram);

    document.getElementById('programName').value = '';
});
