export const logs = [];

export const TASKS = {
  task1: () => task("task1", 1000),
  task2: () => task("task2", 4000),
  task3: () => task("task3", 200),
  task4: () => task("task4", 20),
  task5: () => task("task5", 10),
  task6: () => rejectedTask("task6", 100),
};

export const run = (tasks) => {
  return Promise.all(
    tasks.map((task) => TASKS[task]()),
  );
};

const createLog = (desc, time, handler) => {
  const start = Date.now();

  setTimeout(() => {
    const end = Date.now();

    handler({ desc, start, end, duration: end - start });
  }, time);
};

const task = (desc, time) => {
  return new Promise((resolve) => createLog(desc, time, resolve));
};

const rejectedTask = (desc, time) => {
  return new Promise((resolve, reject) => createLog(desc, time, reject));
};

const runTasks = async (tasks) => {
  for (const task of tasks) {
    let mode = "serial";

    if (task.length > 1) {
      mode = "parallel";
    }
    const completedTask = await run(task)
      .then((x) => {
        return x;
      })
      .catch((x) => {
        console.log(x.desc);
        return Promise.reject();
      });
    // console.log({ mode, tasks: completedTask });
    logs.push({ mode, tasks: completedTask });
  }
};

const main = async () => {
  const tasksToRun = [
    ["task1"],
    ["task2", "task6", "task3"],
    ["task5"],
    ["task2"],
    ["task3", "task4"],
    ["task5"],
  ];
  await runTasks(tasksToRun);
};

main();
