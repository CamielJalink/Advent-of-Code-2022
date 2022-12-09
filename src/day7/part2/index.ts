import { readFileSync } from "fs";
import Item from "./item";

export default function advent() {
    const stringInput = readFileSync("input/day7.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(chooseDirToDelete(input));
}

function chooseDirToDelete(input: string[]) {
    const items = findDirs(input);
    const maxSize = 70000000;
    const targetFreeSize = 30000000;
    const currentFreeSize = maxSize - items[0].size;
    const requiredFreeSize = targetFreeSize - currentFreeSize;
    const largeEnoughItems: Item[] = [];

    items.forEach((item: Item) => {
        if (item.size >= requiredFreeSize) {
            largeEnoughItems.push(item);
        }
    });

    let smallestDeletableDir: Item = largeEnoughItems[0];

    largeEnoughItems.forEach((item: Item) => {
        if (smallestDeletableDir.size > item.size) {
            smallestDeletableDir = item;
        }
    });

    return smallestDeletableDir.size;
}

function findDirs(input: string[]) {
    const items: Item[] = [];
    let activeDir: Item;

    input.forEach((line: string) => {
        if (line.substring(0, 4) === "$ cd") {
            const cdParam = line.split(" ")[2];

            if (cdParam === "/") {
                activeDir = findOrCreateDir(items, "/");
            } else if (cdParam === "..") {
                activeDir = activeDir.parent ? activeDir.parent : activeDir;
            } else {
                const previousItem: Item = activeDir;
                activeDir = findOrCreateDir(items, activeDir.name + "/" + cdParam);
                if (!activeDir.parent) {
                    activeDir.parent = previousItem;
                }
            }
        } else if (line[0] !== "$") {
            checkChildren(items, activeDir, line);
        }
    });

    items.forEach((item: Item) => {
        item.determineSize();
    });
    return items;
}

// Alle dingen die niet met een '$' starten zijn bestanden in m'n huidige directory.
// Als die nog niet bestaan, maak ze aan, voeg ze aan mijn children toe, en maak mij hun parent.
function checkChildren(items: Item[], activeDir: Item, line: string) {
    const [param, name] = line.split(" ");

    // If the next line starts with "dir", it is a child directory of activeDir
    if (param === "dir") {
        // Check to see if this dir already exists or else create it.
        const dir = findOrCreateDir(items, activeDir.name + "/" + name);
        // Link the two dirs together via children and parent properties
        if (!activeDir.children.includes(dir) && activeDir !== dir) {
            activeDir.children.push(dir);
            dir.parent = activeDir;
        }
    } else {
        findOrCreateFile(activeDir, name, param);
    }
}

function findOrCreateFile(parentDir: Item, fileName: string, fileSize: string) {
    let fileAlreadyExists = false;

    for (const child of parentDir.children) {
        if (child.type === "file" && child.name === fileName) {
            fileAlreadyExists = true;
            break;
        }
    }

    if (!fileAlreadyExists) {
        parentDir.children.push(new Item("file", fileName, parentDir, fileSize));
        parentDir.size += parseInt(fileSize);
    }
}

function findOrCreateDir(items: Item[], itemName: string) {
    let dir: Item | undefined = undefined;

    items.forEach((item: Item) => {
        if (item.name === itemName && item.type === "dir") {
            dir = item;
        }
    });

    if (dir === undefined) {
        dir = new Item("dir", itemName);
        items.push(dir);
    }

    return dir;
}
