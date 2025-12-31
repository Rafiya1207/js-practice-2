const validate = (data) => {
  setTimeout(() => new Promise.resolve(data), 0);
};

const credentials = Deno.readTextFile("./file1.txt")
  .then((data) => validate(data))
  .then((data) =>
    Deno.readTextFile("./user_details.txt")
      .then((data) => console.log(data))
  );
