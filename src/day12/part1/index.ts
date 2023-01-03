import { readFileSync } from "fs";
import Tile from "./tile";

export default function advent() {
    const stringInput = readFileSync("input/day12-test.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findShortestPath(input));
}

function findShortestPath(input: string[]) {
    const tiles: Tile[] = [];
    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        for (let x = 0; x < row.length; x++) {
            tiles.push(new Tile(x, y, input[y][x]));
        }
    }

    let start: Tile = tiles[0];
    tiles.forEach((tile: Tile) => {
        tiles.forEach((other: Tile) => {
            if (tile.y === other.y && tile.x === other.x + 1) {
                tile.leftNeighbor = other;
            } else if (tile.y === other.y && tile.x === other.x - 1) {
                tile.rightNeighbor = other;
            } else if (tile.x === other.x && tile.y === other.y + 1) {
                tile.bottomNeighbor = other;
            } else if (tile.x === other.x && tile.y === other.y - 1) {
                tile.topNeighbor = other;
            }
        });
        if (tile.isStart) {
            start = tile;
        }
    });

    const paths: number[] = [];
    start.findPaths(0, paths);

    console.log(paths);
    // Beginnende bij Start.
    // Ga lopen! Dus bouw een route kaart op voor elk mogelijke pad.

    // Als een pad 1 hoger is dan ik. Neem dat pad, en tel +1 bij m'n route.
    // Als geen paden hoger zijn dan ik, dan is dit pad slecht, return.
    // Als ik bij het eindpunt ben. Return dan dat het gelukt is!
    // Voeg mij toe aan een array
}

// Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi
