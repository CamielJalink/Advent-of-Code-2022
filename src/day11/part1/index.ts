import { readFileSync } from "fs";
import Monkey from "./monkey";

export default function advent() {
    const stringInput = readFileSync("input/day11.txt", "utf-8");
    const input = stringInput.split(/\n\n/gm);
    console.log(determineMonkeyBusiness(input));
}

function determineMonkeyBusiness(strMonkeys: string[]) {
    let monkeys: Monkey[] = [];
    strMonkeys.forEach((strMonkey) => {
        monkeys.push(new Monkey(strMonkey));
    });

    monkeys.forEach((monkey: Monkey) => {
        monkey.trueMonkey = monkeys.find((monk) => monk.name === monkey.trueMonkeyName);
        monkey.falseMonkey = monkeys.find((monk) => monk.name === monkey.falseMonkeyName);
    });

    for (let i = 0; i < 20; i++) {
        monkeys.forEach((monkey: Monkey) => {
            monkey.handleItems();
        });
    }
    monkeys.sort((a, b) => {
        if (a.numItemsInspected >= b.numItemsInspected) {
            return -1;
        } else {
            return 1;
        }
    });
    return monkeys[0].numItemsInspected * monkeys[1].numItemsInspected;
}
