import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day10.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    findCode(input);
}

function findCode(input: string[]) {
    let xRegister = 1;
    let cycles = 0;

    const cycleXvalues: number[][] = [[0, 1]];

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

    drawScreen(cycleXvalues);
    return;
}

function drawScreen(cycleXvalues: number[][]) {
    const drawArray: string[] = [];

    for (let row = 0; row < 6; row++) {
        let symbolString = "";

        for (let i = 0; i < 40; i++) {
            const xValue = cycleXvalues[i + 40 * row][1];

            if (i === xValue - 1 || i === xValue || i === xValue + 1) {
                symbolString += "#";
            } else {
                symbolString += ".";
            }
        }
        drawArray.push(symbolString);
    }

    drawArray.forEach((line: string) => {
        console.log(line);
    });
}
