import Item from "./item";

export default class Monkey {
    name: string;
    items: Item[] = [];
    operationType: string;
    operationValue = BigInt(0);
    operationValueOld = "notold";
    divisibleBy: bigint;
    trueMonkeyName: string;
    falseMonkeyName: string;
    trueMonkey?: Monkey;
    falseMonkey?: Monkey;
    numItemsInspected = BigInt(0);
    uglyOne = BigInt(1);
    uglyZero = BigInt(0);

    constructor(strMonkey: string) {
        const input = strMonkey.split(/\n/gm);
        this.name = input[0].split(" ")[1].split(":")[0];
        const startingStrItems = input[1].split(": ")[1].split(",");
        startingStrItems.forEach((strItem) => {
            this.items.push(new Item(strItem));
        });
        const operation = input[2].split(" = old ")[1];
        const operationValue = operation.split(" ")[1];
        this.operationType = operation.split(" ")[0];
        if (operationValue !== "old") {
            this.operationValue = BigInt(operation.split(" ")[1]);
        } else {
            this.operationValueOld = "old";
        }
        this.divisibleBy = BigInt(input[3].split("by ")[1]);
        this.trueMonkeyName = input[4].split("monkey ")[1];
        this.falseMonkeyName = input[5].split("monkey ")[1];
    }

    handleItems() {
        this.items.forEach((item: Item) => {
            this.doOperation(item);
            this.numItemsInspected += this.uglyOne;
            this.doTest(item);
        });
        this.items = [];
    }

    doOperation(item: Item) {
        if (this.operationValueOld === "old") {
            if (this.operationType === "+") {
                // console.log("before adding", item.worry);
                item.worry += item.worry;
                // console.log("after adding", item.worry);
            } else if (this.operationType === "*") {
                // console.log("before multiplying", item.worry);
                item.worry *= item.worry;
                // console.log("after multiplying", item.worry);
            } else {
                console.error("Illegal operationType found!");
            }
        } else {
            if (this.operationType === "+") {
                // console.log("before adding", item.worry);
                item.worry += this.operationValue;
                // console.log("after adding", item.worry);
            } else if (this.operationType === "*") {
                // console.log("before multiplying", item.worry);
                item.worry *= this.operationValue;
                // console.log("after multiplying", item.worry);
            } else {
                console.error("Illegal operationType found!");
            }
        }
    }

    doTest(item: Item) {
        if (item.worry % this.divisibleBy === this.uglyZero) {
            console.log(item.worry, this.divisibleBy, "module is true");
            this.trueMonkey?.items.push(item);
        } else {
            this.falseMonkey?.items.push(item);
        }
    }
}
