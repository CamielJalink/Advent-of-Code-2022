import rawInput from "./input";

export default function advent() {
    const input = rawInput.split(/\n\n/gm);
    findElfWithMostCalories(input);
}

function findElfWithMostCalories(caloriePacks: string[]) {
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
    console.log(elfPacks);
    console.log(Math.max(...elfPacks));
}
