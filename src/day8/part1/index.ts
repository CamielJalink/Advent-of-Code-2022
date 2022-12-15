import { readFileSync } from "fs";
import Tree from "./tree";

export default function advent() {
    const stringInput = readFileSync("input/day8.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(countVisibleTrees(input));
}

function countVisibleTrees(input: string[]) {
    let numVisibleTrees = 0;
    const trees: Tree[] = generateForest(input);
    trees.forEach((tree: Tree) => {
        const y = tree.y;
        const x = tree.x;
        trees.forEach((other: Tree) => {
            // if the other tree is to our left
            if (other.y === y && other.x < x) {
                if (other.height >= tree.height) {
                    tree.isVisibleLeft = false;
                }
            }
            // if the other tree is to our right
            else if (other.y === y && other.x > x) {
                if (other.height >= tree.height) {
                    tree.isVisibleRight = false;
                }
            }
            // tree is to the top
            else if (other.x === x && other.y < y) {
                if (other.height >= tree.height) {
                    tree.isVisibleTop = false;
                }
            } else if (other.x === x && other.y > y) {
                if (other.height >= tree.height) {
                    tree.isVisibleBottom = false;
                }
            }
        });

        if (tree.isVisibleBottom || tree.isVisibleTop || tree.isVisibleLeft || tree.isVisibleRight) {
            numVisibleTrees++;
        }
    });
    return numVisibleTrees;
}

function generateForest(input: string[]) {
    const trees: Tree[] = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            trees.push(new Tree(x, y, input[y][x]));
        }
    }
    return trees;
}
