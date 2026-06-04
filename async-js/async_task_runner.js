function createTask(name, delay, shoulfFail = false) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shoulfFail) reject(new Error(name + "Failed"));
        else resolve(name + 'done');
      }, delay);
    });
}

const runSerially = async (tasks) => {
  const logs = {errors:[], results:[]};

  for (const task of tasks) {
    await task()
      .then((res) => logs.results.push(res))
      .catch((err) => logs.errors.push(err));
  }
  return logs;
};

const runParallely = async (tasks) => {
  const logs = {errors:[], results:[]};

  await Promise.all(
    tasks.map((task) =>
      task()
        .then((res) => logs.results.push(res))
        .catch((err) => logs.errors.push(err))
    ),
  );

  return logs;
};

const runTasks = async (tasks, mode) =>
  await mode === "serial" ? runSerially(tasks) : runParallely(tasks);

const tasks = [
  createTask("A", 300),
  createTask("B", 100, true),
  createTask("C", 200),
];

console.log(await runTasks(tasks, "parallel"));
