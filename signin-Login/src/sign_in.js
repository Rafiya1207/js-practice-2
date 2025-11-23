import { data } from "./data.js";

export const isUser = (userName, userPassword) =>
  data.some(({ userName: name, password }) =>
    name === userName && userPassword === password
  );
