export interface IReservation {
  id: string;
  classroom: {
    id: number;
    name: string;
    capacity: number;
    equipment: string[];
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  startTime: string;
  endTime: string;
}
