const fs = require("fs");
const prompt = require("prompt-sync")();
let day = "day" + prompt("Which day do you wish to generate? Day:");

fs.rmSync("./src/" + day, { recursive: true, force: true });

if (!fs.existsSync("./src/" + day)) {
    fs.mkdirSync("./src/" + day);
    const part1 = "./src/" + day + "/part1";
    const part2 = "./src/" + day + "/part2";
    createStructure(part1);
    createStructure(part2);
} else {
    console.log(day + "already exists!");
}

function createStructure(dirName) {
    fs.mkdirSync(dirName);
    console.log(dirName);

    fs.open(dirName + "/index.js", "wx", function () {});
}
