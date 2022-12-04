import rawInput from "./input";

export default function advent() {
    const input = rawInput.split(/\n/gm);
    console.log(findItemPrioritySum(input));
}

function findItemPrioritySum(rucksacks: string[]) {
    let itemPrioritySum = 0;

    rucksacks.forEach((rucksack) => {
        const overlappingItem = findOverlappingItem(rucksack);
        itemPrioritySum += determineItemScore(overlappingItem);
    });
    return itemPrioritySum;
}

function findOverlappingItem(rucksack: string) {
    const firstCompartment = rucksack.substring(0, rucksack.length / 2);
    const secondCompartment = rucksack.substring(rucksack.length / 2, rucksack.length);

    let overlappingItem = "";
    for (let i = 0; i < firstCompartment.length; i++) {
        if (secondCompartment.indexOf(firstCompartment[i]) !== -1) {
            overlappingItem = firstCompartment[i];
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
