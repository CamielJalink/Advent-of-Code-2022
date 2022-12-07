import { readFileSync } from "fs";
import Item from "./item";

export default function advent() {
    const stringInput = readFileSync("input/day7-test.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findDirs(input));
}

// $ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k

function findDirs(input: string[]) {
    const items: Item[] = [];
    let activeItem: Item;

    input.forEach((line: string) => {
        // Als cd, dan:
        // Zoek de active item.
        // Als hij nog niet bestaat, maak hem aan en maak hem active.

        if (line.substring(0, 4) === "$ cd") {
            const cdParam = line.split(" ")[2];

            if (cdParam === "/") {
                activeItem = findOrCreateItem(items, "/");
            } else if (cdParam === "..") {
                activeItem = activeItem.parent ? activeItem.parent : activeItem;
            } else {
                const previousItem: Item = activeItem;
                activeItem = findOrCreateItem(items, cdParam);
                if (!activeItem.parent) {
                    activeItem.parent = previousItem;
                }
            }
        }
    });
}

function findOrCreateItem(items: Item[], itemName: string) {
    let activeItem: Item;

    items.forEach((item: Item) => {
        if (item.name === itemName) {
            activeItem = item;
            return activeItem;
        }
    });

    activeItem = new Item("dir", itemName);
    return activeItem;
}
