import GetInput, { streamToAsyncIterable } from "../filereader";

const decoder = new TextDecoder();
const input: Map<number, number[]> = new Map();
for await (const chunk of streamToAsyncIterable(await GetInput())) {
  const lines = decoder.decode(chunk).split("\n");
  lines.forEach((line) => {
    var parts = line.split(":")
    input.set(parseInt(parts[0]), parts[1].trim().split(" ").map((num) => parseInt(num)));
  });
}

var totalResult = 0;
input.forEach((value, key) => {
  const possibleCalculations: string[] = [];
  function generateCalculations(nums: string[], index = 0, current = "") {
    if (index === nums.length - 1) {
      possibleCalculations.push(current + nums[index]);
      return;
    }
    generateCalculations(nums, index + 1, current + nums[index] + "*");
    generateCalculations(nums, index + 1, current + nums[index] + "+");
  }
  generateCalculations(value.map((num) => num.toString()));
  let found = false;
  possibleCalculations.forEach((calc) => {
    // console.log(calc);
    if (found) return;
    const tokens = calc.split(/([+*])/);
    // console.log(`Calculating: ${calc}, Tokens: ${tokens}`);    
    let result = parseInt(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const num = parseInt(tokens[i + 1]);

      if (operator === "+") {
        result += num;
      } else if (operator === "*") {
        result *= num;
      }
    }

    if (result == key) {
      console.log(`Answer: ${calc} = ${result}, Key: ${key}`);
      totalResult += result;
      found = true;
    }
  });
});

console.log(`Total: ${totalResult}`);