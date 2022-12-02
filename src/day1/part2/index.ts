import rawInput from "./input";

export default function advent() {
    const input = rawInput.split("\n\n");
    findTopThreeElvesMostCalories(input);
}

function findTopThreeElvesMostCalories(caloriePacks: string[]) {
    const elfPacks: number[] = [];
    caloriePacks.forEach((pack: string) => {
        const packItemsCalories: number[] = pack.split("\n").map((item: string) => {
            return parseInt(item);
        });
        elfPacks.push(
            packItemsCalories.reduce((calories: number, item: number) => {
                return calories + item;
            }),
        );
    });

    elfPacks.sort();
    console.log(elfPacks[elfPacks.length - 1] + elfPacks[elfPacks.length - 2] + elfPacks[elfPacks.length - 3]);
}
