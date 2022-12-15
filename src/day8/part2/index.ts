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
        // console.log(tree.x, tree.y);
        // console.log(tree.isVisibleTop);
        // console.log(tree.isVisibleRight);
        // console.log(tree.isVisibleBottom);
        // console.log(tree.isVisibleLeft);

        if (tree.isVisibleBottom || tree.isVisibleTop || tree.isVisibleLeft || tree.isVisibleRight) {
            numVisibleTrees++;
        }
    });
    return numVisibleTrees;
}

// function determineNeighbors(trees: Tree[]) {
//     trees.forEach((tree: Tree) => {
//         const x = tree.x;
//         const y = tree.y;

//         trees.forEach((otherTree: Tree) => {
//             if (tree !== otherTree) {
//                 const ox = otherTree.x;
//                 const oy = otherTree.y;
//                 // Check if the other tree is left or right
//                 if (Math.abs(ox - x) === 1 && oy === y) {
//                     tree.neighbors.push(otherTree);
//                 } else if (Math.abs(oy - y) === 1 && ox === x) {
//                     tree.neighbors.push(otherTree);
//                 }
//             }
//         });
//     });
// }

function generateForest(input: string[]) {
    const trees: Tree[] = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            trees.push(new Tree(x, y, input[y][x]));
        }
    }
    return trees;
}
