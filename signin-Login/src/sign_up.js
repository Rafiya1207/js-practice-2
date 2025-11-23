import { getCredentials } from "../main.js";

export const writeUserCredentials = (userName, password) => {
  const prevData = Deno.readTextFileSync("./db/data.txt");

  Deno.writeTextFileSync(
    "./db/data.txt",
    prevData.concat("\n") + [
      userName,
      password,
    ],
  );
  console.log(`User named ${userName} created`);
};

export const signUp = () => {
console.log("\nSignUp\n");

  const { userName, password } = getCredentials();
  writeUserCredentials(userName, password);
};
