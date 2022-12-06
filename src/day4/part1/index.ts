import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day4.txt", "utf-8");
    const input = stringInput.split("\n");
    console.log(numberFullyContains(input));
}

function numberFullyContains(elfPairs: string[]) {
    let numRangeContainsOther = 0;
    elfPairs.forEach((elfPair: string) => {
        numRangeContainsOther += rangeContainsOther(elfPair);
    });
    return numRangeContainsOther;
}

function rangeContainsOther(elfPair: string) {
    const ranges = elfPair.split(",");
    const elf1Lower = ranges[0].split("-")[0];
    const elf1Upper = ranges[0].split("-")[1];
    const elf2Lower = ranges[1].split("-")[0];
    const elf2Upper = ranges[1].split("-")[1];

    let oneAreaContainsOther = 0;

    if ((elf1Lower >= elf2Lower && elf1Upper <= elf2Upper) || (elf2Lower >= elf1Lower && elf2Upper <= elf1Upper)) {
        oneAreaContainsOther++;
    }
    if (elf1Lower === elf2Lower && elf1Upper === elf2Upper) {
        oneAreaContainsOther = 0;
    }

    return oneAreaContainsOther;
}

// 512 en 538 waren te hoog. 486 was het ook niet.
// Verschil tussen 512 en 486 is de 26 'exact dubbele' pairs.
