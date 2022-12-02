const fs = require("fs");
const prompt = require("prompt-sync")();
let day = "day" + prompt("Which day do you wish to generate? Day:");

const indexBoilerPlate = `import rawInput from "./input";

export default function advent() {
    const input = rawInput.split(/\\n\\n/gm);
    console.log(input);
}`;

const inputBoilerPlate = `export default \`\`;`;

const startPart1Boilerplate = `import advent from "./${day}/part1";
advent();`;
const startPart2Boilerplate = `import advent from "./${day}/part2";
advent();`;

fs.writeFileSync("./src/startPart1.ts", startPart1Boilerplate);
fs.writeFileSync("./src/startPart2.ts", startPart2Boilerplate);

if (!fs.existsSync("./src/" + day)) {
    fs.mkdirSync("./src/" + day);
    const part1 = "./src/" + day + "/part1";
    const part2 = "./src/" + day + "/part2";
    createStructure(part1);
    createStructure(part2);
} else {
    console.log(day + " already exists!");
}

function createStructure(dirName) {
    fs.mkdirSync(dirName);
    fs.writeFileSync(dirName + "/index.ts", indexBoilerPlate);
    fs.writeFileSync(dirName + "/input.ts", inputBoilerPlate);
}
