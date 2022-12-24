import Item from "./item";

export default class Monkey {
    name: string;
    items: Item[] = [];
    operationType: string;
    operationValue: string;
    divisibleBy: number;
    trueMonkeyName: string;
    falseMonkeyName: string;
    trueMonkey?: Monkey;
    falseMonkey?: Monkey;
    numItemsInspected = 0;

    constructor(strMonkey: string) {
        const input = strMonkey.split(/\n/gm);
        this.name = input[0].split(" ")[1].split(":")[0];
        const startingStrItems = input[1].split(": ")[1].split(",");
        startingStrItems.forEach((strItem) => {
            this.items.push(new Item(strItem));
        });
        const operation = input[2].split(" = old ")[1];
        [this.operationType, this.operationValue] = operation.split(" ");
        this.divisibleBy = parseInt(input[3].split("by ")[1]);
        this.trueMonkeyName = input[4].split("monkey ")[1];
        this.falseMonkeyName = input[5].split("monkey ")[1];
    }

    handleItems() {
        this.items.forEach((item: Item) => {
            this.doOperation(item);
            item.worry = Math.floor(item.worry / 3);
            this.numItemsInspected++;
            this.doTest(item);
        });
        this.items = [];
    }

    doOperation(item: Item) {
        if (this.operationValue === "old") {
            if (this.operationType === "+") {
                item.worry += item.worry;
            } else if (this.operationType === "*") {
                item.worry *= item.worry;
            } else {
                console.error("Illegal operationType found!");
            }
        } else {
            const value = parseInt(this.operationValue);
            if (this.operationType === "+") {
                item.worry += value;
            } else if (this.operationType === "*") {
                item.worry *= value;
            } else {
                console.error("Illegal operationType found!");
            }
        }
    }

    doTest(item: Item) {
        if (item.worry % this.divisibleBy === 0) {
            this.trueMonkey?.items.push(item);
            // console.log("Giving item", item.worry, "to monkey", this.trueMonkey?.name);
        } else {
            this.falseMonkey?.items.push(item);
            // console.log("Giving item", item.worry, "to monkey", this.falseMonkey?.name);
        }
    }
}
