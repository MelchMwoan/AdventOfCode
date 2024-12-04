var path = './Day4/input.txt';

export default async function GetInput(example: boolean = false): Promise<ReadableStream<Uint8Array>> {
    if (example)
        path = path.replace('input', 'exampleInput');
    const file = Bun.file(path);
    return await file.stream();
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