import GetInput, { streamToAsyncIterable } from "../filereader";

var safeCount = 0;
var unsafeCount = 0;

const decoder = new TextDecoder();
for await (const chunk of streamToAsyncIterable(await GetInput())) {
    const lines = decoder.decode(chunk).split('\n');
    for (const line of lines) {
        console.log(`Line: ${line}`);
        const lineNumbers = line.split(' ');
        var safe = true;
        var increasing = null;
        for (var j = 0; j < lineNumbers.length; j++) {
            const lastNumber = parseInt(lineNumbers[j - 1]) || 0;
            const number = parseInt(lineNumbers[j]);
            if (lastNumber == 0) continue;
            if(increasing == null) increasing = number > lastNumber;
            if (increasing && number <= lastNumber) safe = false;
            if (!increasing && number >= lastNumber) safe = false;
            
            var distance = number - lastNumber;
            if (!increasing) distance *= -1;
            
            if (distance < 1 || distance > 3) safe = false;
            if (!safe) {
                console.log(`Unsafe: ${lineNumbers[j - 1]} ${lineNumbers[j]}`);
                break;
            };
        }
        if (safe) safeCount++;
        else unsafeCount++;
        console.log(`Safe: ${safe}`);
    }

    console.log(`Safe Count: ${safeCount}, Unsafe Count: ${unsafeCount}`);
}