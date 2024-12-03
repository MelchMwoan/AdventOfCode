import GetInput, { streamToAsyncIterable } from "../filereader";

const decoder = new TextDecoder();
const regex = /mul\(\d{1,3},\d{1,3}\)/gm
const enableRegex = /do\(\)/gm
const disableRegex = /don't\(\)/gm
const splitRegex = /(?=mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/gm
var sum = 0;
var enabled = true;
for await (const chunk of streamToAsyncIterable(await GetInput())) {
    const lines = decoder.decode(chunk).split('\n');
    for (const line of lines) {
      line.split(splitRegex).forEach(part => {
        part.match(enableRegex) ? enabled = true : part.match(disableRegex) ? enabled = false : null;
        if (!enabled) return;
        part.match(regex)?.forEach(match => {
            const mulValues = match.slice(4, match.length - 1).split(',');
            sum += parseInt(mulValues[0]) * parseInt(mulValues[1]);
            console.log(`${mulValues[0]} * ${mulValues[1]} = ${parseInt(mulValues[0]) * parseInt(mulValues[1])}`);
        });
      });
    }
    console.log(`Sum: ${sum}`);
}