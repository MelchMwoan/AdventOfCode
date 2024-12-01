import GetInput, { streamToAsyncIterable } from "../filereader";

var leftNumbers: number[] = new Array<number>;
var rightNumbers: number[] = new Array<number>;

const decoder = new TextDecoder();
for await (const chunk of streamToAsyncIterable(await GetInput())) {
    const lines = decoder.decode(chunk).split('\n');
    for (const line of lines) {
        const lineNumbers = line.replace(/\s\s+/g, ' ').split(' ');
        leftNumbers.push(parseInt(lineNumbers[0]));
        rightNumbers.push(parseInt(lineNumbers[1]));
    }
}

leftNumbers = leftNumbers.sort((a, b) => a - b);
rightNumbers = rightNumbers.sort((a, b) => a - b);
var totalCount = 0;

for (let i = 0; i < leftNumbers.length; i++) {
    const left = leftNumbers[i];
    const appearedRight = rightNumbers.filter(x => x === left).length;
    console.log(`Left: ${left}, Right: ${appearedRight}`);
    totalCount += left * appearedRight;
}

console.log(`Total Count: ${totalCount}`);