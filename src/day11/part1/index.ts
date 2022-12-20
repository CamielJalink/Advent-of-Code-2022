import { readFileSync } from "fs";
import Monkey from "./monkey";

export default function advent() {
    const stringInput = readFileSync("input/day11-test.txt", "utf-8");
    const input = stringInput.split(/\n\n/gm);
    console.log(determineMonkeyBusiness(input));
}

function determineMonkeyBusiness(strMonkeys: string[]) {
    const monkeys: Monkey[] = [];
    strMonkeys.forEach((strMonkey) => {
        monkeys.push(new Monkey(strMonkey));
    });
}
