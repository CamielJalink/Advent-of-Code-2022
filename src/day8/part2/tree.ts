export default class Tree {
    x: number;
    y: number;
    height: number;
    isVisibleLeft = true;
    isVisibleRight = true;
    isVisibleTop = true;
    isVisibleBottom = true;
    // neighbors: Tree[] = [];

    constructor(x: number, y: number, height: string) {
        this.x = x;
        this.y = y;
        this.height = parseInt(height);
    }

    // 632 is too low.

    // isVisible() {
    //     // This tree is visible if it's on the edge of the forest.
    //     if (this.neighbors.length < 4) {
    //         return true;
    //     }

    //     const smallerNeighbors: Tree[] = [];
    //     this.neighbors.forEach((neighbor: Tree) => {
    //         if (neighbor.height < this.height) {
    //             smallerNeighbors.push(neighbor);
    //         }
    //     });
    //     // If we have no smaller neighbors, we are not visible
    //     if (smallerNeighbors.length === 0) {
    //         return false;
    //     } else {
    //         for (let i = 0; i < smallerNeighbors.length; i++) {
    //             // if any of our smaller neighbors is visible, then so are we!
    //             if (smallerNeighbors[i].isVisible()) {
    //                 return true;
    //             }
    //         }
    //         // if none of our smallerNeighbors are visible, then we are also not visible.
    //         return false;
    //     }
    // }
}
