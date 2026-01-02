export const logs = [];

export const TASKS = {
  task1: () => task("task1", 1000),
  task2: () => task("task2", 4000),
  task3: () => task("task3", 200),
  task4: () => task("task4", 20),
  task5: () => task("task5", 10),
};

export const runParalelly = (tasks) =>
  Promise.all(tasks.map((task) => TASKS[task]()));

export const runSerially = async(...task) => [await TASKS[task]()];

export const MODES = {
  parallel: runParalelly,
  serial: runSerially,
};

const createLog = (desc, time, resolve) => {
  const start = Date.now();

  setTimeout(() => {
    const end = Date.now();

    resolve({ desc, start, end, duration: end - start });
  }, time);
};

const task = (desc, time) => {
  return new Promise((resolve) => createLog(desc, time, resolve));
};

export const runTasksSerially = async (tasks) => {
  for (const task of tasks) {
    await TASKS[task]();
  }
};

const runTasks = async (tasks) => {
  for (const task of tasks) {
    let mode = "serial";

    if (task.length > 1) {
      mode = "parallel";
    }
    const completedTask = await MODES[mode](task);
    logs.push({ mode, tasks : completedTask });
  }
};

const main = async () => {
  const tasksToRun = [["task1"], ["task5"], ["task2"], ["task3", "task4"]];
  await runTasks(tasksToRun);
  console.log(logs);
};

main();
