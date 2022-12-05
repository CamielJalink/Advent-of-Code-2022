import rawInput from "./input";

export default function advent() {
    const input = rawInput.split(/\n\n/gm);
    console.log(findCode(input));
}

function findCode(input: string[]) {
    let stacks: string[][] = parseStacks(input[0]);
    stacks = followInstructions(stacks, input[1]);
    return fillCode(stacks);
}

//    [D]
//[N] [C]
//[Z] [M] [P]
// 1   2   3

function parseStacks(input: string) {
    const stacks: string[][] = [];
    const inputLines = input.split("\n");
    const lastLine: string = inputLines.pop()?.trim() || "";
    const numStacks = parseInt(lastLine[lastLine.length - 1]);

    for (let i = 0; i < numStacks; i++) {
        stacks.push([]);
    }

    inputLines.forEach((inputLine: string) => {
        for (let i = 0; i < numStacks; i++) {
            const indexOfChar = 1 + i * 4;
            if (inputLine[indexOfChar] !== " ") {
                stacks[i].push(inputLine[indexOfChar]);
            }
        }
    });
    console.log(stacks);
    return stacks;
}

//move 1 from 2 to 1
//move 3 from 1 to 3
//move 2 from 2 to 1
//move 1 from 1 to 2

function followInstructions(stacks: string[][], stringInstructions: string) {
    const instructions = stringInstructions.split("\n");
    instructions.forEach((instruction: string) => {
        const instructionArray = instruction.split(" ");
        const amount = parseInt(instructionArray[1]);
        const fromStack = parseInt(instructionArray[3]) - 1; // -1 because our stacks array starts with index 0.
        const toStack = parseInt(instructionArray[5]) - 1;
        // console.log("before:");
        // console.log(stacks);
        for (let i = 0; i < amount; i++) {
            stacks = useCrane(stacks, fromStack, toStack);
        }
        // console.log("after:");
        // console.log(stacks);
    });

    return stacks;
}

function useCrane(stacks: string[][], fromStack: number, toStack: number) {
    const cargo = stacks[fromStack].shift() || "";
    stacks[toStack].unshift(cargo);
    return stacks;
}

function fillCode(stacks: string[][]) {
    console.log(stacks);

    let code = "";
    stacks.forEach((stack: string[]) => {
        code += stack[0];
    });

    return code;
}

// Eerste guess was VDSHJMMZ
// Tweede guess was HHZPLFJQZ
// Derde guess was VQSDLFQMZ
