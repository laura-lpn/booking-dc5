import { IReservation } from "./reservation.type";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  reservations: IReservation[];
}

export interface createUserDTO {
  email: string;
  password: string;
}