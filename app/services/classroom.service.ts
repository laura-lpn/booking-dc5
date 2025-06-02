import api from "./api.service";

const ENDPOINT = "/classrooms";

const fetchAll = async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

const fetchById = async (id: string) => {
  const response = await api.get(`${ENDPOINT}/${id}`);
  return response.data;
};

const create = async (data: any) => {
  const response = await api.post(ENDPOINT, data);
  return response.data;
};

const remove = async (id: string) => {
  const response = await api.delete(`${ENDPOINT}/${id}`);
  return response.data;
};

const update = async (id: string, data: any) => {
  const response = await api.put(`${ENDPOINT}/${id}`, data);
  return response.data;
};

const ClassroomService = {
  fetchAll,
  fetchById,
  create,
  remove,
  update,
};

export default ClassroomService;
