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
var timesPassedZero = 0;
const decoder = new TextDecoder();
for await (const chunk of streamToAsyncIterable(
  await GetInput(dayInt, example)
)) {
  const lines = decoder.decode(chunk).split("\n");
  for (const line of lines) {
    if (line.trim() === "") continue;
    // for all lines, process each line
    const [direction, distance] = returnDirAndDis(line);

    const distanceToZero = direction === "R" ? (100 - curPos) % 100 : curPos;
    if (distanceToZero === 0) {
      timesPassedZero += Math.floor(distance / 100); // already at zero so just count full laps
    } else if (distance >= distanceToZero) {
      const remainingDistance = distance - distanceToZero;
      timesPassedZero += 1 + Math.floor(remainingDistance / 100); // passed zero once plus how many full laps
    }
    curPos =
      direction === "R"
        ? (curPos + distance) % 100
        : (((curPos - distance) % 100) + 100) % 100;

    logMessage(
      `Current Position: ${curPos}, applied ${direction}${distance} times passed zero: ${timesPassedZero}`
    );
  }
}
logInfo(`Final Position: ${curPos}, Times passed zero: ${timesPassedZero}`);
