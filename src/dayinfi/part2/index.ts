import { readFileSync } from "fs";

function getDirection(currentDirection: number, value: number) {
    let newDirection = currentDirection + value;
    if (newDirection >= 360) {
        newDirection -= 360;
    } else if (newDirection < 0) {
        newDirection += 360;
    }

    return newDirection;
}

function determineManhattanDistance(input: string[]) {
    let distance = 0;

    const coordinate = [0, 0];
    let direction = 0;

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    const visited: number[][] = [];

    input.forEach((item) => {
        const split = item.split(" ");
        const operation = split[0];
        const value = parseInt(split[1]);

        const shouldX = direction === 45 || direction === 90 || direction === 135;
        const shouldMinX = direction === 315 || direction === 270 || direction === 225;
        const shouldY = direction === 315 || direction === 0 || direction === 45;
        const shouldMinY = direction === 180 || direction === 225 || direction === 135;

        if (operation === "draai") {
            direction = getDirection(direction, value);
        } else if (operation === "loop" || operation === "spring") {
            if (shouldX) {
                coordinate[0] += value;
                minX = Math.min(coordinate[0], minX);
                maxX = Math.max(coordinate[0], maxX);
            }
            if (shouldMinX) {
                coordinate[0] -= value;
                minX = Math.min(coordinate[0], minX);
                maxX = Math.max(coordinate[0], maxX);
            }
            if (shouldY) {
                coordinate[1] += value;
                minY = Math.min(coordinate[1], minY);
                maxY = Math.max(coordinate[1], maxY);
            }
            if (shouldMinY) {
                coordinate[1] -= value;
                minY = Math.min(coordinate[1], minY);
                maxY = Math.max(coordinate[1], maxY);
            }

            visited.push([coordinate[0], coordinate[1]]);
        }
    });

    console.log(visited);
    distance = Math.abs(coordinate[0]) + Math.abs(coordinate[1]);

    drawShit(visited, minX, maxX, minY, maxY);

    return distance;
}

function drawShit(visited: number[][], oldMinX: number, oldMaxX: number, oldMinY: number, oldMaxY: number) {
    const minX = Math.abs(oldMinX);
    const maxX = oldMaxX + minX;
    const minY = Math.abs(oldMinY);
    const maxY = oldMaxY + minY;

    // const field = new Array(maxY).fill(".".repeat(maxX));
    const field: string[][] = [];
    for (let i = 0; i < maxY; i++) {
        field.push(new Array(maxX).fill("."));
    }

    let prev: number[] = [0, 0];
    visited.forEach((coordinate) => {
        const prevX = prev[0];
        const prevY = prev[1];
        const nextX = coordinate[0];
        const nextY = coordinate[1];

        const minX = Math.min(prevX, nextX);
        const maxX = Math.max(prevX, nextX);
        const minY = Math.min(prevY, nextY);
        const maxY = Math.max(prevY, nextY);

        // Je loopt alleen in Y richting
        if (prevX === nextX) {
            for (let y = minY; y < maxY; y++) {
                field[y][prevX] = "x";
            }
        }
        if (prevY === nextY) {
            for (let x = minX; x < maxX; x++) {
                console.log("trying to set" + prevY + " " + x);
                field[prevY - 1][x] = "x";
            }
        }

        prev = coordinate;
    });

    field.forEach((row) => console.log(...row));
}

export default function advent() {
    const stringInput = readFileSync("input/dayinfi.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(determineManhattanDistance(input));
}
