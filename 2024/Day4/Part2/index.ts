import GetInput, { streamToAsyncIterable } from "../filereader";

const decoder = new TextDecoder();
var count = 0;
var arrayOfChar: string[][] = [];
for await (const chunk of streamToAsyncIterable(await GetInput())) {
  const lines = decoder.decode(chunk).split("\n");
  lines.forEach((line) => {
    arrayOfChar.push(line.split("").filter((char) => char.match(/[A-z]/i)));
  });
}
for (let i = 0; i < arrayOfChar.length; i++) {
  for (let j = 0; j < arrayOfChar[i].length; j++) {
    if (arrayOfChar[i][j] === "A" && arrayOfChar[i - 1] && arrayOfChar[i + 1]) {
      if (
        (arrayOfChar[i - 1][j - 1] === "M" && arrayOfChar[i + 1][j + 1] === "S") ||
        (arrayOfChar[i - 1][j - 1] === "S" && arrayOfChar[i + 1][j + 1] === "M")
      ) {
        if (
          (arrayOfChar[i - 1][j + 1] === "M" && arrayOfChar[i + 1][j - 1] === "S") ||
          (arrayOfChar[i - 1][j + 1] === "S" && arrayOfChar[i + 1][j - 1] === "M")
        ) {
          count++;
        }
      }
    }
  }
}

console.log(count);
