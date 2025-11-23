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

const isValidPassword = (password) => password.length >= 10;

export const signUp = () => {
  console.log("\nSignUp\nNote: password should contain atleast 10 Chars\n");

  const { userName, password } = getCredentials();

  if (isValidPassword(password)) {
    writeUserCredentials(userName, password);
    return;
  }
  console.log("\nIncorrect password");
  signUp();
};
