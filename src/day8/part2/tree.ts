export default class Tree {
    x: number;
    y: number;
    height: number;
    scenicScore = 0;
    topNeighbor?: Tree;
    bottomNeighbor?: Tree;
    leftNeighbor?: Tree;
    rightNeighbor?: Tree;

    constructor(x: number, y: number, height: string) {
        this.x = x;
        this.y = y;
        this.height = parseInt(height);
    }

    determineScenicScore() {
        const numTreesLeft = this.countTreesLeft(0, this.height);
        const numTreesRight = this.countTreesRight(0, this.height);
        const numTreesTop = this.countTreesTop(0, this.height);
        const numTreesBottom = this.countTreesBottom(0, this.height);
        this.scenicScore = numTreesLeft * numTreesRight * numTreesTop * numTreesBottom;
    }

    countTreesLeft(numTreesLeft: number, treeHeight: number): number {
        // If we don't have a left neighbor, return the accumulator up till now
        if (!this.leftNeighbor) {
            return numTreesLeft;
        }
        // If the neighbor next to us is higher then the tree we are currently considering, add that tree and return
        else if (this.leftNeighbor.height >= treeHeight) {
            return numTreesLeft + 1; // I can see my neighbor but no further
        }
        // Else, ask the neighbor to check his neighbor
        else {
            return this.leftNeighbor?.countTreesLeft(numTreesLeft + 1, treeHeight);
        }
    }

    countTreesRight(numTreesRight: number, treeHeight: number): number {
        if (!this.rightNeighbor) {
            return numTreesRight;
        } else if (this.rightNeighbor.height >= treeHeight) {
            return numTreesRight + 1; // I can see my neighbor but no further
        } else {
            return this.rightNeighbor?.countTreesRight(numTreesRight + 1, treeHeight);
        }
    }

    countTreesTop(numTreesTop: number, treeHeight: number): number {
        if (!this.topNeighbor) {
            return numTreesTop;
        } else if (this.topNeighbor.height >= treeHeight) {
            return numTreesTop + 1; // I can see my neighbor but no further
        } else {
            return this.topNeighbor?.countTreesTop(numTreesTop + 1, treeHeight);
        }
    }

    countTreesBottom(numTreesBottom: number, treeHeight: number): number {
        if (!this.bottomNeighbor) {
            return numTreesBottom;
        } else if (this.bottomNeighbor.height >= treeHeight) {
            return numTreesBottom + 1; // I can see my neighbor but no further
        } else {
            return this.bottomNeighbor?.countTreesBottom(numTreesBottom + 1, treeHeight);
        }
    }
}
