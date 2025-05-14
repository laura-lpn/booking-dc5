export interface IClassroom {
  id: number;
  name: string;
  capacity: number;
  equipment: string[];
  isActive: boolean;
  reservations: {
    id: number;
    startTime: string;
    endTime: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}