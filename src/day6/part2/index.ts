import { readFileSync } from "fs";

export default function advent() {
    const input = readFileSync("input/day6.txt", "utf-8");
    console.log(findMarker(input));
}

function findMarker(input: string) {
    let startOfPacketMarker = 0;

    for (let i = 14; i < input.length; i++) {
        const substring = input.substring(i - 14, i);
        if (!hasCharDouble(substring)) {
            startOfPacketMarker = i;
            break;
        }
    }

    return startOfPacketMarker;
}

function hasCharDouble(substring: string) {
    console.log(substring);
    let hasDouble = false;
    let buildString = "";
    for (let i = 0; i < substring.length; i++) {
        if (buildString.includes(substring[i])) {
            hasDouble = true;
            break;
        } else {
            buildString += substring[i];
        }
    }
    return hasDouble;
}
