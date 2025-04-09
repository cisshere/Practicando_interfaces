
//import React from "react";

//export const userContext = React.createContext<User | null>(null);


export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password?: string;
  birthDate?: Date | null;
  image?: string;
  bloodGroup?: string;
  heigth?: number;
  weigth?: number;
  eyeColor?: string;
  hair?: Hair;
  ip?: string;
  address?: Address;
  macAddress?: string;
  university?: string;
  bank?: Bank;
  company?: Company;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: Crypto;
  role?: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Address {
  address: string;
  city: number;
  state: string;
  stateCode: string;
  postalCode: number;
  coordinates: Coordinates;
  country: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bank {
  cardExpire: string;
  cardNumber: number;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  departament: string;
  name: string;
  title: string;
  adress: Address;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}
