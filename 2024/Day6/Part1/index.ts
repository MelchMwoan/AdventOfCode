import GetInput, { streamToAsyncIterable } from "../filereader";

const decoder = new TextDecoder();
const map: string[][] = [];
const visited: boolean[][] = [];
for await (const chunk of streamToAsyncIterable(await GetInput(true))) {
  const lines = decoder.decode(chunk).split("\n");
  lines.forEach((line) => {
    map.push(line.split("").filter((char) => char.match(/[.#^]/i)));
    visited.push(new Array(line.length).fill(false));
  });
}

const guardY = map.findIndex((row) => row.includes("^"));
const guardX = map[guardY].indexOf("^");
visited[guardY][guardX] = true;

var direction: number = 0;
var exited = false;
var currentX = guardX;
var currentY = guardY;
while (!exited) {
  switch (direction) {
    case 0:
      currentY--;
      if (!map[currentY] || !map[currentY][currentX]) {
        exited = true;
        break;
      }
      else if (map[currentY][currentX] === "#") {
        direction = (direction + 90) % 360;
        currentY++;
        break;
      }
      visited[currentY][currentX] = true;
      break;
    case 90:
      currentX++;
      if (!map[currentY] || !map[currentY][currentX]) {
        exited = true;
        break;
      }
      else if (map[currentY][currentX] === "#"){
        direction = (direction + 90) % 360;
        currentX--;
        break;
      }
      visited[currentY][currentX] = true;
      break;
    case 180:
      currentY++;
      if (!map[currentY] || !map[currentY][currentX]) {
        exited = true;
        break;
      }
      else if (map[currentY][currentX] === "#"){
        direction = (direction + 90) % 360;
        currentY--;
        break;
      }
      visited[currentY][currentX] = true;
      break;
    case 270:
      currentX--;
      if (!map[currentY] || !map[currentY][currentX]) {
        exited = true;
        break;
      }
      else if (map[currentY][currentX] === "#"){
        direction = (direction + 90) % 360;
        currentX++;
        break;
      }
      visited[currentY][currentX] = true;
      break;
    }
}


console.log(map.map((row, rowIndex) => row.map((cell, cellIndex) => visited[rowIndex][cellIndex] ? "X" : cell).join("")).join("\n"));
console.log(visited.flat().filter((cell) => cell).length);