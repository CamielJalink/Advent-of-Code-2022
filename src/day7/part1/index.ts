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
        if (line.substring(0, 4) === "$ cd") {
            const cdParam = line.split(" ")[2];

            if (cdParam === "/") {
                activeItem = findOrCreateDir(items, "/");
            } else if (cdParam === "..") {
                activeItem = activeItem.parent ? activeItem.parent : activeItem;
            } else {
                const previousItem: Item = activeItem;
                activeItem = findOrCreateDir(items, cdParam);
                if (!activeItem.parent) {
                    activeItem.parent = previousItem;
                }
            }
        } else if (line[0] !== "$") {
            checkChildren(items, activeItem, line);
        }
    });
}

// & ls is eigenlijk een overbodige command waar ik niks mee hoef.
// De active directory verandert namelijk niet!
// Alle dingen die niet met een '$' starten zijn bestanden in m'n huidige directory.
// Als die nog niet bestaan, maak ze aan, voeg ze aan mijn children toe, en maak mij hun parent.

function checkChildren(items: Item[], dir: Item, line: string) {
    console.log("test");
}

function findOrCreateDir(items: Item[], itemName: string) {
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
