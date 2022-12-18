import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day10.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findSumSignalStrengths(input));
}

function findSumSignalStrengths(input: string[]) {
    let xRegister = 1;
    let cycles = 1;

    const cycleXvalues: number[][] = [];

    input.forEach((stringInstruction: string) => {
        const [instruction, amount] = stringInstruction.split(" ");

        if (instruction === "noop") {
            cycles++;
            cycleXvalues.push([cycles, xRegister]);
        } else if (instruction === "addx") {
            cycles++;
            cycleXvalues.push([cycles, xRegister]);
            xRegister += parseInt(amount);
            cycles++;
            cycleXvalues.push([cycles, xRegister]);
        }
    });

    let totalSignalStrength = 0;
    cycleXvalues.forEach((cycleXvalue: number[]) => {
        const c = cycleXvalue[0];
        const x = cycleXvalue[1];
        if (c === 20 || c === 60 || c === 100 || c === 140 || c === 180 || c === 220) {
            // console.log("in cycle", c, "we had xvalue", cycleXvalue[1], "with signal strength", c * cycleXvalue[1]);
            totalSignalStrength += c * x;
        }
    });

    return totalSignalStrength;
}
