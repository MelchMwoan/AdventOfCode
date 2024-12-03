import GetInput, { streamToAsyncIterable } from "../filereader";

const decoder = new TextDecoder();
const regex = /mul\(\d{1,3},\d{1,3}\)/gm
var sum = 0;
for await (const chunk of streamToAsyncIterable(await GetInput())) {
    const lines = decoder.decode(chunk).split('\n');
    for (const line of lines) {
        const matches = line.match(regex);
        matches?.forEach(match => {
            const mulValues = match.slice(4, match.length - 1).split(',');
            sum += parseInt(mulValues[0]) * parseInt(mulValues[1]);
            console.log(`${mulValues[0]} * ${mulValues[1]} = ${parseInt(mulValues[0]) * parseInt(mulValues[1])}`);
        });
    }
    console.log(`Sum: ${sum}`);
}