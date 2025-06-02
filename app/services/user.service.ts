import api from "./api.service";

const ENDPOINT = "/users";

const fetchCurentUser = async () => {
  const response = await api.get(`${ENDPOINT}/me`);
  return response.data;
};

const updateUser = async (userId: string, data: any) => {
  const response = await api.put(`${ENDPOINT}/${userId}`, data);
  return response.data;
};

const UserService = {
  fetchCurentUser,
  updateUser,
};

export default UserService;
  