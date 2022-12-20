import Item from "./item";

export default class Monkey {
    name: string;
    items: Item[] = [];

    constructor(strMonkey: string) {
        const input = strMonkey.split(/\n/gm);
        this.name = input[0].split(":")[0];
        const startingStrItems = input[1].split(": ")[1].split(",");
        startingStrItems.forEach((strItem) => {
            this.items.push(new Item(strItem));
        });
    }
}

// Monkey 0:
//   Starting items: 79, 98
//   Operation: new = old * 19
//   Test: divisible by 23
//     If true: throw to monkey 2
//     If false: throw to monkey 3
