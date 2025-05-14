import api from "./api.service";

const ENDPOINT = "/classrooms";

const fetchAll = async () => {
  const response = await api.get(ENDPOINT);
  console.log('response', response.data);
  return response.data;
};

const ClassroomService = {
  fetchAll,
};

export default ClassroomService;
