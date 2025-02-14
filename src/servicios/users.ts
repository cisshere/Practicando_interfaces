import { User } from "../types/index";

const URLUSERS = "https://dummyjson.com/users";

export const listUsers = async () => {
  try {
    const response = await fetch(URLUSERS);
    const responseJson: { users: User[] } = await response.json();

    console.log("Esta todo ok");

    return responseJson.users;
  } catch (error) {
    console.log("Error al obtenedor datos", error);
  }
};

export const addUser = async (userDatos: User): Promise<User | undefined> => {
  //Especificar que la promesa devuelve un usuario o undefined
  // y que userDatos es de tipo User
  try {
    const response = await fetch(`${URLUSERS}/add`, {
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

export const userDeleteId = async (id: number) => {
  try {
    const response = await fetch(`${URLUSERS}/${id}`, {
      //lo obtengo mediante id
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Usuario eliminado:", data);
    return data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};
