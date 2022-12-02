import rawInput from "./input";

export default function advent() {
    const input = rawInput.split(/\n\n/gm);
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
    const opponentHand = game[0];
    const myHand = game[2];
    let myScore = 0;

    switch (opponentHand) {
        case "A":
            switch (myHand) {
                case "X":
                    myScore = 4;
                    break;
                case "Y":
                    myScore = 8;
                    break;
                case "Z":
                    myScore = 3;
                    break;
            }
            break;
        case "B":
            switch (myHand) {
                case "X":
                    myScore = 1;
                    break;
                case "Y":
                    myScore = 5;
                    break;
                case "Z":
                    myScore = 9;
                    break;
            }
            break;
        case "C":
            switch (myHand) {
                case "X":
                    myScore = 7;
                    break;
                case "Y":
                    myScore = 2;
                    break;
                case "Z":
                    myScore = 6;
                    break;
            }
            break;
    }

    return myScore;
}
