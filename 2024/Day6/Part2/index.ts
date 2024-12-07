import GetInput, { streamToAsyncIterable } from "../filereader";

const decoder = new TextDecoder();
const map: string[][] = [];
const visited: number[][] = [];
for await (const chunk of streamToAsyncIterable(await GetInput())) {
  const lines = decoder.decode(chunk).split("\n");
  lines.forEach((line) => {
    map.push(line.split("").filter((char) => char.match(/[.#^]/i)));
    visited.push(new Array(line.length).fill(false));
  });
}

var stuckCount = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] != "^" && map[y][x] != "#") {
      map[y][x] = "#";
      tryExitMap();
      map[y][x] = ".";
      visited.forEach((row) => row.fill(0));
    }
  }
}
console.log(stuckCount);

function tryExitMap() {
  const guardY = map.findIndex((row) => row.includes("^"));
  const guardX = map[guardY].indexOf("^");
  visited[guardY][guardX] = 1;

  var direction: number = 0;
  var exited = false;
  var stuck = false;
  var currentX = guardX;
  var currentY = guardY;
  while (!exited && !stuck) {
    switch (direction) {
      case 0:
        currentY--;
        if (!map[currentY] || !map[currentY][currentX]) {
          exited = true;
          break;
        } else if (map[currentY][currentX] === "#") {
          direction = (direction + 90) % 360;
          currentY++;
          break;
        }
        visited[currentY][currentX] += 1;
        if (visited[currentY][currentX] > 3) stuck = true;
        break;
      case 90:
        currentX++;
        if (!map[currentY] || !map[currentY][currentX]) {
          exited = true;
          break;
        } else if (map[currentY][currentX] === "#") {
          direction = (direction + 90) % 360;
          currentX--;
          break;
        }
        visited[currentY][currentX] += 1;
        if (visited[currentY][currentX] > 3) stuck = true;
        break;
      case 180:
        currentY++;
        if (!map[currentY] || !map[currentY][currentX]) {
          exited = true;
          break;
        } else if (map[currentY][currentX] === "#") {
          direction = (direction + 90) % 360;
          currentY--;
          break;
        }
        visited[currentY][currentX] += 1;
        if (visited[currentY][currentX] > 3) stuck = true;
        break;
      case 270:
        currentX--;
        if (!map[currentY] || !map[currentY][currentX]) {
          exited = true;
          break;
        } else if (map[currentY][currentX] === "#") {
          direction = (direction + 90) % 360;
          currentX++;
          break;
        }
        visited[currentY][currentX] += 1;
        if (visited[currentY][currentX] > 3) stuck = true;
        break;
    }
  }
  if (stuck) {
    console.log("Stuck");
    stuckCount++;
  }
}
// console.log(map.map((row, rowIndex) => row.map((cell, cellIndex) => visited[rowIndex][cellIndex] > 0 ? "X" : cell).join("")).join("\n"));
// console.log(visited.flat().filter((cell) => cell > 0).length);
