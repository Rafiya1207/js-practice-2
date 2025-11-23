import { writeUserCredentials } from "./src/sign_in.js";
const main = () => {
  const userName = prompt("Enter User Name: ");
  const password = prompt("Enter Password: ");

  writeUserCredentials(userName, password);
};

main();