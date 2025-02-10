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

export const addUser = async (userDatos: User): Promise<User | undefined> => {  //Especificar que la promesa devuelve un usuario o undefined 
  // y que userDatos es de tipo User
  try {
    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDatos),
    });

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error("No se obtudo datos", error);
  }
};
