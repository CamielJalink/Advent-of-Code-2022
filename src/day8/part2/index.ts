import { readFileSync } from "fs";
import Tree from "./tree";

export default function advent() {
    const stringInput = readFileSync("input/day8.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findHeighestScore(input));
}

function findHeighestScore(input: string[]) {
    let highestScenicScore = 0;
    const trees: Tree[] = generateForest(input);
    determineNeighbors(trees);
    determineScenicScores(trees);
    trees.forEach((tree: Tree) => {
        if (tree.scenicScore > highestScenicScore) {
            highestScenicScore = tree.scenicScore;
        }
    });
    return highestScenicScore;
}

function determineScenicScores(trees: Tree[]) {
    trees.forEach((tree: Tree) => {
        tree.determineScenicScore();
    });
}

function determineNeighbors(trees: Tree[]) {
    trees.forEach((tree: Tree) => {
        const x = tree.x;
        const y = tree.y;

        trees.forEach((otherTree: Tree) => {
            if (tree !== otherTree) {
                const ox = otherTree.x;
                const oy = otherTree.y;
                if (ox - x === 1 && oy === y) {
                    tree.rightNeighbor = otherTree;
                } else if (ox - x === -1 && oy === y) {
                    tree.leftNeighbor = otherTree;
                } else if (oy - y === 1 && ox === x) {
                    tree.bottomNeighbor = otherTree;
                } else if (oy - y === -1 && ox === x) {
                    tree.topNeighbor = otherTree;
                }
            }
        });
    });
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
