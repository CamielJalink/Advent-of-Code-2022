import rawInput from "./input";

export default function advent() {
    const input = rawInput.split(/\n/gm);
    console.log(findItemPrioritySum(input));
}

function findItemPrioritySum(rucksacks: string[]) {
    let itemPrioritySum = 0;

    while (rucksacks.length > 0) {
        const teamOfThree: string[] = [];
        teamOfThree.push(rucksacks.pop() as string);
        teamOfThree.push(rucksacks.pop() as string);
        teamOfThree.push(rucksacks.pop() as string);

        const overlappingItem = findOverlappingItem(teamOfThree[0], teamOfThree[1], teamOfThree[2]);
        itemPrioritySum += determineItemScore(overlappingItem);
    }

    return itemPrioritySum;
}

function findOverlappingItem(rucksack1: string, rucksack2: string, rucksack3: string) {
    let overlappingItem = "";
    for (let i = 0; i < rucksack1.length; i++) {
        if (rucksack2.indexOf(rucksack1[i]) !== -1 && rucksack3.indexOf(rucksack1[i]) !== -1) {
            overlappingItem = rucksack1[i];
            break;
        }
    }
    return overlappingItem;
}

function determineItemScore(item: string) {
    let score = item.charCodeAt(0);

    if (item === item.toLowerCase()) {
        score -= 96;
    } else {
        score -= 38;
    }

    return score;
}
