import rawInput from "./input";

export default function advent() {
    const input = rawInput.split(/\n\n/gm);
    console.log(findCode(input));
}

function findCode(input: string[]) {
    const stacks: string[][] = parseStacks(input[0]);
    console.log(stacks);
    const code = "";

    return code;
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
