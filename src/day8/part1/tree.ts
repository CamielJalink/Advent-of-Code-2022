export default class Tree {
    x: number;
    y: number;
    height: number;
    isVisibleLeft = true;
    isVisibleRight = true;
    isVisibleTop = true;
    isVisibleBottom = true;

    constructor(x: number, y: number, height: string) {
        this.x = x;
        this.y = y;
        this.height = parseInt(height);
    }
}
