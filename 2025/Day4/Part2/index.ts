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

let accessibleRolls: [number, number][] = [];
function updateGrid(grid: string[][]): [string[][], number] {
  const newGrid: string[][] = [];
  let changedCount = 0;
  newGrid.push(...grid.map(row => [...row]));
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "@" && isAccessible(grid, row, col)) {
        accessibleRolls.push([row, col]);
        newGrid[row][col] = "x";
        changedCount++;
        logDebug(`Roll at (${row}, ${col}) is accessible.`);
      }
    }
  }
  return [newGrid, changedCount];
}

let gridToUpdate: string[][] = rollsGrid.map(row => [...row]);
while (true) {
  const [newGrid, changedCount] = updateGrid(gridToUpdate);
  if (changedCount === 0) break;
  gridToUpdate = newGrid;
}

logInfo(`Accessible rolls: ${accessibleRolls.length}`);