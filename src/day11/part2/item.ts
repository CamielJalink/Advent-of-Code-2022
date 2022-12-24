export default class Item {
    worry: bigint;
    constructor(initialWorry: string) {
        this.worry = BigInt(initialWorry);
        console.log("initial worry is", this.worry);
    }
}
