import { data } from "./data.js";
import { getCredentials } from "../main.js";

export const isUser = (userName, userPassword) =>
  data.some(({ userName: name, password }) =>
    name === userName && userPassword === password
  );

export const signIn = () => {
  console.log('\nLogIn\n');
  
  const { userName, password } = getCredentials();
  const message = isUser(userName, password)
    ? "Logged In"
    : "Incorrect User Name or password";

  console.log(message);
};
