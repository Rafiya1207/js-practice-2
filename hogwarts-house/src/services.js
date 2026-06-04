import { readFile } from "./controllers.js";

export const addVote = (houses, users, house) => {
  
  houses[house]["votes"]++;
};

export const calculatePercentage = (houses) => {
  const totalVotes = Object.values(houses).reduce(
    (sum, { votes }) => sum + votes,
    0,
  );

  console.log(totalVotes);

  for (const house in houses) {
    houses[house]["percentages"] =
      Math.round(((houses[house]["votes"] / totalVotes) * 100) * 100) / 100;
  }

  return houses;
};

export const addUser = (users, user, house) => {
  if (!(user in users)) {
    users[user] = house;
  }
};

export const getUsers = async () => {
  const data = await readFile("./data/users.json");

  return Object.keys(data);
};

export const getHouses = async () => {
  const data = await readFile("./data/houses.json");

  return data;
};
