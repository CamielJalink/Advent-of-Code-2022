import { readFileSync } from "fs";

export default function advent() {
    const input = readFileSync("input/day6.txt", "utf-8");
    console.log(findMarker(input));
}

function findMarker(input: string) {
    let startOfPacketMarker = 0;

    for (let i = 3; i < input.length; i++) {
        const first = input[i - 3];
        const second = input[i - 2];
        const third = input[i - 1];
        const fourth = input[i];
        if (
            first !== second &&
            first !== third &&
            first !== fourth &&
            second !== third &&
            second !== fourth &&
            third !== fourth
        ) {
            startOfPacketMarker = i + 1;
            break;
        }
    }

    return startOfPacketMarker;
}
