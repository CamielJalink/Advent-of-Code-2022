import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day4.txt", "utf-8");
    const input = stringInput.split("\n");
    console.log(numberFullyContains(input));
}

function numberFullyContains(elfPairs: string[]) {
    let numRangeContainsOther = 0;
    elfPairs.forEach((elfPair: string) => {
        if (rangeContainsOther(elfPair)) {
            numRangeContainsOther++;
        }
    });
    return numRangeContainsOther;
}

function rangeContainsOther(elfPair: string) {
    const ranges = elfPair.split(",");
    const elf1Lower = parseInt(ranges[0].split("-")[0]);
    const elf1Upper = parseInt(ranges[0].split("-")[1]);
    const elf2Lower = parseInt(ranges[1].split("-")[0]);
    const elf2Upper = parseInt(ranges[1].split("-")[1]);

    let pairContainsOther = false;

    if ((elf1Lower <= elf2Lower && elf1Upper >= elf2Upper) || (elf2Lower <= elf1Lower && elf2Upper >= elf1Upper)) {
        pairContainsOther = true;
    }
    return pairContainsOther;
}
