const createTransformStream = new TransformStream({
  transform(chunk, controller) {
    
    controller.enqueue(chunk)
  },
});

// readable -> tranform/filter -> writable

Deno.stdin.readable
  .pipeThrough(createTransformStream)
  .pipeTo(Deno.stdout.writable);
