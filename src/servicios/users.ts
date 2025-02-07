import { User } from "../types/index";

export const listUsers = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const responseJson: { users: User[] } = await response.json();

    console.log("Esta todo ok");

    return responseJson.users;
  } catch (error) {
    console.log("Error al obtenedor datos", error);
  }
};

