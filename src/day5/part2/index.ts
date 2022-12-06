import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day5.txt", "utf-8");
    const input = stringInput.split("\n\n");
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
        stacks = useCrane(stacks, amount, fromStack, toStack);
    });

    return stacks;
}

function useCrane(stacks: string[][], amount: number, fromStack: number, toStack: number) {
    const cargo: string[] = [];
    for (let i = 0; i < amount; i++) {
        cargo.unshift(stacks[fromStack].shift() || "");
    }

    cargo.forEach((cargoItem: string) => {
        stacks[toStack].unshift(cargoItem);
    });

    return stacks;
}

function fillCode(stacks: string[][]) {
    let code = "";
    stacks.forEach((stack: string[]) => {
        code += stack[0];
    });

    return code;
}
