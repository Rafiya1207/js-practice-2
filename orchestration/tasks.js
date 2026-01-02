export const logs = [];

export const TASKS = {
  task1: () => task("task1", 1000),
  task2: () => task("task2", 4000),
  task3: () => task("task3", 200),
};

const createLog = (desc, time, resolve) => {
  const start = Date.now();

  setTimeout(() => {
    const end = Date.now();

    logs.push({ desc, start, end, duration: end - start });
    resolve({ desc, start, end, duration: end - start });
  }, time);
};

const task = (desc, time) => {
  return new Promise((resolve) => createLog(desc, time, resolve));
};

export const runSequentially = async (tasks) => {
  for (const task of tasks) {
    await TASKS[task]();
  }
};

export const runParalelly = (tasks) =>
  Promise.all(tasks.map((task) => TASKS[task]()));

const main = async () => {
  const tasksToRun = ["task1", "task3", "task2"];
  await runParalelly(tasksToRun);
  console.log(logs);
};

// main();