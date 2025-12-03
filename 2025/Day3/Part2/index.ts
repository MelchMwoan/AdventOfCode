import GetInput, { streamToAsyncIterable } from "../../filereader.ts";
import { logDebug, logInfo, logMessage, logWarning } from "../../logger.ts";
const dayInt = 3;
const example = false;

const batteryBanks: number[][] = [];

const decoder = new TextDecoder();
for await (const chunk of streamToAsyncIterable(
  await GetInput(dayInt, example)
)) {
  const lines = decoder.decode(chunk).split("\n");
  for (const line of lines) {
    if (line.trim() === "") continue;
    batteryBanks.push(line.trim().split("").map((char) => parseInt(char)));
  }
}

function getLargestBatteriesSum(bank: number[]): number {
  // logDebug(`Processing bank: ${bank}`);
  const selected: number[] = [];
  let bankIndex = 0;
  for (let selectedPos = 0; selectedPos < 12; selectedPos++) {
    let max = -1;
    let maxId = -1;
    for (let i = bankIndex; i <= bank.length - (12 - selectedPos); i++) {
      if (bank[i] > max) {
        max = bank[i];
        maxId = i;
      }
    }
    // logDebug(`Selected digit ${max} at index ${maxId} for position ${selectedPos}`);
    selected.push(max);
    bankIndex = maxId + 1;
  }
  const joltage = parseInt(selected.join(""));
  logMessage(`Largest possible joltage for bank: ${bank} is ${joltage}`);
  return joltage;
}

let totalSum = 0;
for (const bank of batteryBanks) {
  totalSum += getLargestBatteriesSum(bank);
}
logInfo(`Total sum of combined largest batteries: ${totalSum}`);