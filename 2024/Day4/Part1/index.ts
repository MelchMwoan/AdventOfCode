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
    if (arrayOfChar[i][j] === "X") {
      if (arrayOfChar[i][j + 1] === "M" && arrayOfChar[i][j + 2] === "A" && arrayOfChar[i][j + 3] === "S")
        count++;
      if (arrayOfChar[i + 3] && arrayOfChar[i + 1][j] === "M" && arrayOfChar[i + 2][j] === "A" && arrayOfChar[i + 3][j] === "S")
        count++;
      if (arrayOfChar[i + 3] && arrayOfChar[i + 1][j + 1] === "M" && arrayOfChar[i + 2][j + 2] === "A" && arrayOfChar[i + 3][j + 3] === "S")
        count++;
      if (arrayOfChar[i + 3] && arrayOfChar[i + 1][j - 1] === "M" && arrayOfChar[i + 2][j - 2] === "A" && arrayOfChar[i + 3][j - 3] === "S")
        count++;
      if (arrayOfChar[i][j - 1] === "M" && arrayOfChar[i][j - 2] === "A" && arrayOfChar[i][j - 3] === "S")
        count++;
      if (arrayOfChar[i - 3] && arrayOfChar[i - 1][j - 1] === "M" && arrayOfChar[i - 2][j - 2] === "A" && arrayOfChar[i - 3][j - 3] === "S")
        count++;
      if (arrayOfChar[i - 3] && arrayOfChar[i - 1][j] === "M" && arrayOfChar[i - 2][j] === "A" && arrayOfChar[i - 3][j] === "S")
        count++;
      if (arrayOfChar[i - 3] && arrayOfChar[i - 1][j + 1] === "M" && arrayOfChar[i - 2][j + 2] === "A" && arrayOfChar[i - 3][j + 3] === "S")
        count++;
    }
  }
}
console.log(count);