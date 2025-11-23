import { parseData } from "./src/parseData.js";
import { signIn } from "./src/sign_in.js";
import { signUp } from "./src/sign_up.js";

export const getCredentials = () => {
  const userName = prompt("Enter User Name: ");
  const password = prompt("Enter Password: ");

  return { userName, password };
};

const main = () => {
  const isNotMember = confirm("Not a member ? (Sign Up)");
  
  parseData();

  if (isNotMember) {
    return signUp();
  }
  return signIn();
};

main();
