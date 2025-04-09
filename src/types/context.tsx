 import React, { useContext, useState } from "react";
import { User } from ".";

interface UserContext{
    user: Partial<User>
    setUsuario: (user: Partial<User>)=>void;
    customers: Partial<User>[]
    setCustomers: (lista: Partial<User>[])=>void;
}

const Context = React.createContext<UserContext>({
    user:{}, 
    setUsuario: (user: Partial<User>)=> {}, //partial hace que todos los atributos de user sean opcionales
    customers: [],
    setCustomers: ()=>{}
});


export const useUserContext = ()=> {
    const data = useContext(Context);
    if(!data){
        throw new Error()
    }
    return data;
}

export const UserProvider = ({children}: React.PropsWithChildren)=>{
    const [user, setUser] = useState<Partial<User>>({firstName: 'Rolando'});
    const [customers, setCustomers] = useState<Partial<User>[]>([]);

    return (
        <Context.Provider value={{user, setUsuario: setUser, customers, setCustomers }}>{children}</Context.Provider>
    );
}