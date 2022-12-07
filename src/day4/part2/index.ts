import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day4.txt", "utf-8");
    const input = stringInput.split("\n");
    console.log(numberPairsWithOverlap(input));
}

function numberPairsWithOverlap(elfPairs: string[]) {
    let pairsWithOverlap = 0;
    elfPairs.forEach((elfPair: string) => {
        if (pairHasOverlap(elfPair)) {
            pairsWithOverlap++;
        }
    });
    return pairsWithOverlap;
}

function pairHasOverlap(elfPair: string) {
    const ranges = elfPair.split(",");
    const elf1Lower = parseInt(ranges[0].split("-")[0]);
    const elf1Upper = parseInt(ranges[0].split("-")[1]);
    const elf2Lower = parseInt(ranges[1].split("-")[0]);
    const elf2Upper = parseInt(ranges[1].split("-")[1]);

    let hasOverlap = false;

    if (elf1Lower >= elf2Lower && elf1Lower <= elf2Upper) {
        hasOverlap = true;
    } else if (elf1Upper >= elf2Lower && elf1Upper <= elf2Upper) {
        hasOverlap = true;
    } else if (elf2Lower >= elf1Lower && elf2Lower <= elf1Upper) {
        hasOverlap = true;
    } else if (elf2Upper >= elf1Lower && elf2Upper <= elf1Upper) {
        hasOverlap = true;
    }

    return hasOverlap;
}
