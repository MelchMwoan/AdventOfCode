import GetInput, { streamToAsyncIterable } from "../../filereader.ts";
import { logDebug, logInfo, logMessage, logWarning } from "../../logger.ts";
const dayInt = 2;
const example = false;

//input is , comma separated values ranges. and a range is two ids separated by a - dash
function returnRanges(input: string): [number, number][] {
  const rangeStrs = input.split(",");
  const ranges: [number, number][] = [];
  for (const rangeStr of rangeStrs) {
    const [startStr, endStr] = rangeStr.split("-");
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);
    ranges.push([start, end]);
  }
  return ranges;
}

const decoder = new TextDecoder();
let allRanges: [number, number][] = [];
for await (const chunk of streamToAsyncIterable(
  await GetInput(dayInt, example)
)) {
  const lines = decoder.decode(chunk).split("\n");
  for (const line of lines) {
    if (line.trim() === "") continue;
    // it is probably one line
    const ranges = returnRanges(line);
    allRanges = allRanges.concat(ranges);
    logInfo(`Parsed ranges: ${ranges.length}`);
  }
}

let invalidIds: Set<number> = new Set();
// for all ranges, get all invalid id's
// id is invalid when starting with 0 or when it is made up of multiple identical sequences
for (const [start, end] of allRanges) {
  for (let id = start; id <= end; id++) {
    if (id === 0) {
      invalidIds.add(id);
      continue;
    }
    // regex to check for repeated capture groups
    const idStr = id.toString();
    if (/^(.+)\1+$/.test(idStr)) {
      invalidIds.add(id);
      logWarning(`Found invalid id: ${id}`);
    }
  }
}
logMessage(`Total invalid ids found: ${invalidIds.size}`);
logMessage(`Sum of invalid ids: ${Array.from(invalidIds).reduce((a, b) => a + b, 0)}`);