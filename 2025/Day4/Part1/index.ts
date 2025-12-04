import GetInput, { streamToAsyncIterable } from "../../filereader.ts";
import { logDebug, logInfo, logMessage, logWarning } from "../../logger.ts";
const dayInt = 4;
const example = false;

const rollsGrid: string[][] = [];

const decoder = new TextDecoder();
for await (const chunk of streamToAsyncIterable(
  await GetInput(dayInt, example)
)) {
  const lines = decoder.decode(chunk).split("\n");
  for (const line of lines) {
    if (line.trim() === "") continue;
    rollsGrid.push(line.trim().split(""));
  }
}

logMessage(`Loaded grid with ${rollsGrid.length} rows and ${rollsGrid[0]?.length} columns.`);

function isAccessible(grid: string[][], row: number, col: number): boolean {
  let adjacentCount = 0;
  for (let checkX = -1; checkX <= 1; checkX++) {
    for (let checkY = -1; checkY <= 1; checkY++) {
      if (checkX === 0 && checkY === 0) continue;
      if (row + checkX >= 0 && row + checkX < grid.length && col + checkY >= 0 && col + checkY < grid[0].length && grid[row + checkX][col + checkY] === "@") 
        adjacentCount++;
    }
  }
  return adjacentCount < 4;
}

const accessibleRolls: [number, number][] = [];
for (let row = 0; row < rollsGrid.length; row++) {
  for (let col = 0; col < rollsGrid[row].length; col++) {
    if (rollsGrid[row][col] === "@" && isAccessible(rollsGrid, row, col)) {
      accessibleRolls.push([row, col]);
      logDebug(`Roll at (${row}, ${col}) is accessible.`);
    }
  }
}

logInfo(`Accessible rolls: ${accessibleRolls.length}`);