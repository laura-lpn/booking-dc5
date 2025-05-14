import prisma from "../lib/prisma";

export interface CreateClassroomInput {
  name: string;
  capacity: number;
  equipment: string[];
}

export interface UpdateClassroomInput extends Partial<CreateClassroomInput> {
  isActive?: boolean;
}

export class ClassroomService {
  static async createClassroom(data: CreateClassroomInput) {
    return prisma.classroom.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        equipment: data.equipment,
      },
    });
  }

  static async getAllClassrooms() {
    return prisma.classroom.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  static async getClassroomById(id: number) {
    return prisma.classroom.findUnique({
      where: { id },
      include: {
        reservations: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  static async updateClassroom(id: number, data: UpdateClassroomInput) {
    return prisma.classroom.update({
      where: { id },
      data: {
        name: data.name,
        capacity: data.capacity,
        equipment: data.equipment,
        isActive: data.isActive,
      },
    });
  }

  static async deleteClassroom(id: number) {
    // Au lieu de supprimer, on marque la salle comme inactive
    return prisma.classroom.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  static async searchClassrooms(query: string) {
    return prisma.classroom.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { equipment: { has: query } },
        ],
      },
      orderBy: {
        name: "asc",
      },
    });
  }
}
