import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day10-test.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findSumSignalStrengths(input));
}

function findSumSignalStrengths(input: string[]) {
    let xRegister = 1;
    let cycles = 0;

    input.forEach((stringInstruction: string) => {
        const [instruction, ammount] = stringInstruction.split(" ");

        if (instruction === "noop") {
            console.log("found a noop");
            cycles++;
        }
        // else if(instruction === "addx"){

        // }
    });

    return 0;
}
