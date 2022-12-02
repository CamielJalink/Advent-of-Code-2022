import rawInput from "./input";

function advent() {
    const input = rawInput.split("\n");
    console.log(checkStrategy(input));
}

function checkStrategy(strategy: string[]) {
    let totalPoints = 0;

    strategy.forEach((game: string) => {
        totalPoints += playGame(game);
    });
    return totalPoints;
}

function playGame(game: string) {
    let myScore = 0;

    switch (game) {
        // We play scissors and lose
        case "A X":
            myScore = 3;
            break;
        // We play rock and draw
        case "A Y":
            myScore = 4;
            break;
        // We play play paper and win
        case "A Z":
            myScore = 8;
            break;
        // We play rock and lose
        case "B X":
            myScore = 1;
            break;
        // We play paper and draw
        case "B Y":
            myScore = 5;
            break;
        // We play scissors and win
        case "B Z":
            myScore = 9;
            break;
        // We play paper and lose
        case "C X":
            myScore = 2;
            break;
        // We play scissors and draw
        case "C Y":
            myScore = 6;
            break;
        // We play rock and win
        case "C Z":
            myScore = 7;
            break;
        default:
            console.error("illegal game found!");
    }

    return myScore;
}

advent();
