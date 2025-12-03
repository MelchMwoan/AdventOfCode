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
  let maxJoltage = 0;
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const joltage = `${bank[i]}${bank[j]}`;
      if (parseInt(joltage) > maxJoltage) {
        maxJoltage = parseInt(joltage);
        // logDebug(`New max joltage found: ${joltage} (batteries at positions ${i} and ${j})`);
      }
    }
  }
  logMessage(`Largest possible joltage for bank: ${bank} is ${maxJoltage}`);
  return maxJoltage;
}

let totalSum = 0;
for (const bank of batteryBanks) {
  totalSum += getLargestBatteriesSum(bank);
}
logInfo(`Total sum of combined largest batteries: ${totalSum}`);