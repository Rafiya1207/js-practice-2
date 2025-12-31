const delay = (time, value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), time);
  });
};

delay(1000, 1)
  .then((x) => {
    console.log(x);
    return Promise.resolve(++x);
  })
  .then((y) => {
    return delay(y * 1000, y)
      .then((y) => {
        console.log(y);
        return Promise.resolve(++y);
      });
  })
  .then((z) => {
    return delay(z * 1000, z)
      .then((z) => {
        console.log(z);
        return Promise.resolve(++z);
      });
  });
