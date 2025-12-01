import GetInput, { streamToAsyncIterable } from "../../filereader.ts";
import { logDebug, logInfo, logMessage } from "../../logger.ts";
const dayInt = 1;
const example = false;

// regex split
function returnDirAndDis(input: string): [string, number] {
  const [_, direction, distanceStr] = input.match(/([RL])(\d+)/)!;
  const distance = parseInt(distanceStr, 10);
  logDebug(`Direction: ${direction}, Distance: ${distance}`);
  return [direction, distance];
}

var curPos = 50;
var timesLeftOnZero = 0;
const decoder = new TextDecoder();
for await (const chunk of streamToAsyncIterable(
  await GetInput(dayInt, example)
)) {
  const lines = decoder.decode(chunk).split("\n");
  for (const line of lines) {
    if (line.trim() === "") continue;
    // for all lines, process each line
    const [direction, distance] = returnDirAndDis(line);
    if (direction === "R") {
      curPos += distance;
    } else {
      curPos -= distance;
    }
    curPos = (curPos + 100) % 100;
    if (curPos === 0) timesLeftOnZero += 1;
    logMessage(`Current Position: ${curPos}, applied ${direction}${distance}`);
  }
}
logInfo(`Final Position: ${curPos}, Times left on zero: ${timesLeftOnZero}`);
