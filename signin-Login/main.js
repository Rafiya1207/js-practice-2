import { parseData } from "./src/parseData.js";
import { signIn } from "./src/sign_in.js";
import { signUp } from "./src/sign_up.js";

export const getCredentials = () => {
  const userName = prompt("Enter User Name: ");
  const password = prompt("Enter Password: ");

  return { userName, password };
};

const main = () => {
  const isMember = confirm("Are you already a member?");

  parseData();

  if (isMember) {
    return signIn();
  }
  return signUp();
};

main();
