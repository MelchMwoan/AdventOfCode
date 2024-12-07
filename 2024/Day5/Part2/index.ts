import GetInput, { streamToAsyncIterable } from "../filereader";

const decoder = new TextDecoder();
const rules: string[] = [];
const updates: string[] = [];
const incorrectUpdates: string[] = [];
var doneRules = false;
for await (const chunk of streamToAsyncIterable(await GetInput())) {
  const lines = decoder.decode(chunk).split("\n");
  lines.forEach((line) => {
    if (line === "\r") {
      doneRules = true;
    } else if (doneRules) {
      updates.push(line.replace("\r", ""));
    } else {
      rules.push(line.replace("\r", ""));
    }
  });
}

var sum = 0;
updates.forEach((update) => {
  const updateNumbers = update.split(",");
  var correct = true;
  updateLoop: for (const number of updateNumbers) {
    for (const rule of rules) {
      const ruleNumbers = rule.split("|");
      if (ruleNumbers[1].includes(number)) {
        if (update.includes(ruleNumbers[0])) {
          const frontNumberIndex = update.indexOf(ruleNumbers[0]);
          const backNumberIndex = update.indexOf(ruleNumbers[1]);
          if (backNumberIndex != -1 && frontNumberIndex != -1 && frontNumberIndex > backNumberIndex) {
            console.log(`Rule: ${rule} Number: ${number}`);
            correct = false;
            break updateLoop;
          }
        }
      }
    }
  }
  console.log(`Update: ${update} Correct: ${correct}`);
  if (correct) {
    sum += parseInt(updateNumbers[(Math.round(updateNumbers.length / 2)-1)]);
  } else {
    incorrectUpdates.push(update);
  }
});
console.log(`Correct Sum: ${sum}`);

sum = 0;
incorrectUpdates.forEach((update) => {
  const updateNumbers = update.split(",");
  let changed = true;
  while (changed) {
    changed = false;
    for (const rule of rules) {
      const ruleNumbers = rule.split("|");
      if (updateNumbers.indexOf(ruleNumbers[0]) !== -1 && updateNumbers.indexOf(ruleNumbers[1]) !== -1 
              && updateNumbers.indexOf(ruleNumbers[0]) > updateNumbers.indexOf(ruleNumbers[1])) {
        updateNumbers.splice(updateNumbers.indexOf(ruleNumbers[0]), 1);
        const newIndex = updateNumbers.indexOf(ruleNumbers[1]);
        updateNumbers.splice(newIndex, 0, ruleNumbers[0]);
        changed = true;
      }
    }
  }
  console.log(`Reordered Update: ${updateNumbers.join(",")}`);
  sum += parseInt(updateNumbers[(Math.round(updateNumbers.length / 2)-1)]);
});
console.log(`Incorrect Sum: ${sum}`);
