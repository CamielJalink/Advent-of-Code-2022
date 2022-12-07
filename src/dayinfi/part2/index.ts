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
            }
            if (shouldMinX) {
                coordinate[0] -= value;
            }
            if (shouldY) {
                coordinate[1] += value;
            }
            if (shouldMinY) {
                coordinate[1] -= value;
            }
        }
    });

    distance = Math.abs(coordinate[0]) + Math.abs(coordinate[1]);

    return distance;
}

export default function advent() {
    const stringInput = readFileSync("input/dayinfi.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(determineManhattanDistance(input));
}
