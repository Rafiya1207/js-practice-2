import { data } from "./data.js";

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

const isUserAlreadyExist = (userInput) =>
  data.some(({ userName }) => userInput === userName);

const validateUser = (userInput) => {
  if (isUserAlreadyExist(userInput)) {
    console.log("\nSorry! user already exist. Try again with another name\n");

    const userName = prompt("Enter User Name: ");
    return validateUser(userName);
  }
  return userInput;
};

const validatePassword = (userInput) => {
  if (!isValidPassword(userInput)) {
    console.log(
      "Incorrect password. Try Again\n\nNote: password should contain atleast 10 Chars",
    );

    const userPassword = prompt("Enter Password: ");
    return validatePassword(userPassword);
  }
  return userInput;
};

export const signUp = () => {
  console.log("\nSignUp\nNote: password should contain atleast 10 Chars\n");

  const userName = prompt("Enter User Name: ");
  const validUserName = validateUser(userName);

  const userPassword = prompt("Enter Password: ");
  const validPassword = validatePassword(userPassword);

  writeUserCredentials(validUserName, validPassword);
};
