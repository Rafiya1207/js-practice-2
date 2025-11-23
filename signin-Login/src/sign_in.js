export const writeUserCredentials = (userName, password) => {
  const prevData = Deno.readTextFileSync("./db/data.txt");

  Deno.writeTextFileSync("./db/data.txt", prevData.concat('\n') + [
    userName,
    password,
  ]);
  console.log(`User named ${userName} created`);
};