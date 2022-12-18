import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day9.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(countTailLocations(input));
}

function countTailLocations(input: string[]) {
    const tailLocations: string[] = [];

    const knots: number[][] = [];
    for (let i = 0; i < 10; i++) {
        knots.push([0, 0]);
    }
    const headLocation = knots[0]; // x, y
    const tailLocation = knots[9];

    input.forEach((instruction) => {
        const [direction, steps] = instruction.split(" ");

        for (let i = 0; i < parseInt(steps); i++) {
            switch (direction) {
                case "U":
                    headLocation[1]++;
                    break;
                case "R":
                    headLocation[0]++;
                    break;
                case "D":
                    headLocation[1]--;
                    break;
                case "L":
                    headLocation[0]--;
                    break;
                default:
                    console.error("illegal direction!");
                    break;
            }

            determineTailLocation(knots);

            const newTailLocation = tailLocation[0].toString() + "," + tailLocation[1].toString();

            if (!tailLocations.includes(newTailLocation)) {
                tailLocations.push(newTailLocation);
            }
        }
    });
    return tailLocations.length;
}

// Voor elke knoop, roep de functie aan met de vorige knoop.

function determineTailLocation(knots: number[][]) {
    for (let i = 1; i < knots.length; i++) {
        const headKnot = knots[i - 1];
        const tailKnot = knots[i];
        setStep(headKnot, tailKnot);
    }
}

function setStep(headLocation: number[], tailLocation: number[]) {
    const headx = headLocation[0];
    const heady = headLocation[1];
    const tailx = tailLocation[0];
    const taily = tailLocation[1];

    // only move the tail when the head and tail aren't touching.
    if (Math.abs(headx - tailx) <= 1 && Math.abs(heady - taily) <= 1) {
        return tailLocation;
    }

    // If the head is to the upperright of the tail, step diagonally
    if (heady > taily && headx > tailx) {
        tailLocation[0]++;
        tailLocation[1]++;
    }
    // If the head is to the down right of the tail, step diagonally
    else if (heady < taily && headx > tailx) {
        tailLocation[0]++;
        tailLocation[1]--;
    }
    // If the head is to the down left of the tail, step diagonally
    else if (heady < taily && headx < tailx) {
        tailLocation[0]--;
        tailLocation[1]--;
    }
    // If the head is to the upperleft of the tail, step diagonally
    else if (heady > taily && headx < tailx) {
        tailLocation[0]--;
        tailLocation[1]++;
    }
    // If the head is to the right of the tail
    else if (heady === taily && headx > tailx) {
        tailLocation[0]++;
    }
    // If the head is to the left of the tail
    else if (heady === taily && headx < tailx) {
        tailLocation[0]--;
    }
    // If the head is to the top of the tail
    else if (headx === tailx && heady > taily) {
        tailLocation[1]++;
    }
    // If the head is to the bottom of the tail
    else if (headx === tailx && heady < taily) {
        tailLocation[1]--;
    }

    return tailLocation;
}
