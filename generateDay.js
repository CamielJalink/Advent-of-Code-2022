const fs = require("fs");
const prompt = require("prompt-sync")();
let day = "day" + prompt("Which day do you wish to generate? Day:");

fs.rmSync("./src/" + day, { recursive: true, force: true });

const typeScriptBoilerplate = `import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\\r\\n");
    console.log(input);
}

advent();`;

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
    fs.writeFileSync(dirName + "/index.ts", typeScriptBoilerplate);
    fs.writeFileSync(dirName + "/input.txt", "12345");
}
