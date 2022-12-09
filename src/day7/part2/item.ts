export default class Item {
    name: string;
    type: "dir" | "file";
    size: number;
    children: Item[] = [];
    parent: Item | undefined;

    constructor(type: "dir" | "file", name: string, parent?: Item, size?: string) {
        this.type = type;
        this.name = name;
        this.size = size ? parseInt(size) : 0;
        this.parent = parent;
    }

    determineSize() {
        if (this.type === "dir") {
            this.size = 0;
            this.children.forEach((child: Item) => {
                this.size += child.determineSize();
            });
        }
        return this.size;
    }
}
