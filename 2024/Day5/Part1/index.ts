import GetInput, { streamToAsyncIterable } from "../filereader";

const decoder = new TextDecoder();
const rules: string[] = [];
const updates: string[] = [];
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
  }
});
console.log(`Sum: ${sum}`);