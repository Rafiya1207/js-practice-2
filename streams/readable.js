const mockStream = (data) =>
  new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });

const stream = mockStream('hello');

stream.
