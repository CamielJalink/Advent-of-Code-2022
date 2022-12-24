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

    monkeys.forEach((monkey: Monkey) => {
        monkey.trueMonkey = monkeys.find((monk) => monk.name === monkey.trueMonkeyName);
        monkey.falseMonkey = monkeys.find((monk) => monk.name === monkey.falseMonkeyName);
    });

    for (let i = 0; i < 20; i++) {
        monkeys.forEach((monkey: Monkey) => {
            monkey.handleItems();
        });

        if (i === 0 || i === 19 || i === 999) {
            monkeys.sort((a, b) => {
                if (a.numItemsInspected >= b.numItemsInspected) {
                    return -1;
                } else {
                    return 1;
                }
            });
            console.log("now at round", i);
            monkeys.forEach((monkey) => {
                console.log("monkey", monkey.numItemsInspected);
            });
            const bigint1 = monkeys[0].numItemsInspected;
            const bigint2 = monkeys[1].numItemsInspected;
            console.log("after", i, "rounds we have", bigint1, "*", bigint2, "=", bigint1 * bigint2);
        }
    }
    monkeys.sort((a, b) => {
        if (a.numItemsInspected >= b.numItemsInspected) {
            return -1;
        } else {
            return 1;
        }
    });
    const bigint1 = BigInt(monkeys[0].numItemsInspected);
    const bigint2 = BigInt(monkeys[1].numItemsInspected);

    return bigint1 * bigint2;
}
