import path from "path";
import { logMessage } from "./logger";

export default async function GetInput(dayInt: number, example: boolean = false): Promise<ReadableStream<Uint8Array>> {
    const parentPath = import.meta.dir;
    const absolutePath = path.resolve(parentPath, `./Day${dayInt}/${example ? "exampleInput" : "input"}.txt`);
    logMessage(`Reading file from path: ${absolutePath}`);
    const file = Bun.file(absolutePath);
    return file.stream();
}

export async function* streamToAsyncIterable(stream: ReadableStream) {
    const reader = stream.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            yield value;
        }
    } finally {
        reader.releaseLock();
    }
}