export default class Tile {
    x: number;
    y: number;
    isStart = false;
    isHighestPoint = false;
    height: number;
    leftNeighbor?: Tile;
    rightNeighbor?: Tile;
    topNeighbor?: Tile;
    bottomNeighbor?: Tile;

    constructor(x: number, y: number, stringHeight: string) {
        this.x = x;
        this.y = y;
        if (stringHeight === "S") {
            this.height = 1;
            this.isStart = true;
        } else if (stringHeight === "E") {
            this.height = 26;
            this.isHighestPoint = true;
        } else {
            this.height = map.get(stringHeight);
        }
    }

    findPaths(currentPath: number, paths: number[]): number {
        if (this.isHighestPoint) {
            paths.push(currentPath++);
            return currentPath;
        }
        if (this.topNeighbor && this.topNeighbor.height <= this.height++) {
            console.log("step to topNeighbor");
            this.topNeighbor.findPaths(currentPath++, paths);
        }
        if (this.rightNeighbor && this.rightNeighbor.height <= this.height++) {
            console.log("step to rightNeighbor");
            this.rightNeighbor.findPaths(currentPath++, paths);
        }
        if (this.bottomNeighbor && this.bottomNeighbor.height <= this.height++) {
            console.log("step to bottomNeighbor");
            this.bottomNeighbor.findPaths(currentPath++, paths);
        }
        if (this.leftNeighbor && this.leftNeighbor.height <= this.height++) {
            console.log("step to leftNeighbor");
            this.leftNeighbor.findPaths(currentPath++, paths);
        }
    }
}

const map = new Map();
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);
map.set("d", 4);
map.set("e", 5);
map.set("f", 6);
map.set("g", 7);
map.set("h", 8);
map.set("i", 9);
map.set("j", 10);
map.set("k", 11);
map.set("l", 12);
map.set("m", 13);
map.set("n", 14);
map.set("o", 15);
map.set("p", 16);
map.set("q", 17);
map.set("r", 18);
map.set("s", 19);
map.set("t", 20);
map.set("u", 21);
map.set("v", 22);
map.set("w", 23);
map.set("x", 24);
map.set("y", 25);
map.set("z", 26);
