import GetInput, { streamToAsyncIterable } from "../filereader";

var safeCount = 0;
var unsafeCount = 0;

const decoder = new TextDecoder();

function isSafeReport(lineNumbers: string[]) {
  var increasing = null;
  var safe = true;
  for (var j = 1; j < lineNumbers.length; j++) {
    const lastNumber = parseInt(lineNumbers[j - 1]) || 0;
    const number = parseInt(lineNumbers[j]);
    if (lastNumber == 0) continue;
    if(increasing == null) increasing = number > lastNumber;
    if (increasing && number <= lastNumber) safe = false;
    if (!increasing && number >= lastNumber) safe = false;
    
    var distance = number - lastNumber;
    if (!increasing) distance *= -1;
    
    if (distance < 1 || distance > 3) safe = false;
  }
  return safe;
}

for await (const chunk of streamToAsyncIterable(await GetInput())) {
  const lines = decoder.decode(chunk).split("\n");

  for (const line of lines) {
    if (!line.trim()) continue;
    const lineNumbers = line.split(" ");
    var safe = isSafeReport(lineNumbers);

    if (!safe) {
      lineNumbers.forEach((_, i) => {
        if (safe) return;
        const modifiedReport = lineNumbers
          .slice(0, i)
          .concat(lineNumbers.slice(i + 1));
        safe = isSafeReport(modifiedReport);
      });
    }
    if (safe) safeCount++;
    else unsafeCount++;
  }

  console.log(`Safe Count: ${safeCount}, Unsafe Count: ${unsafeCount}`);
}
