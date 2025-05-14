import api from "./api.service";

const ENDPOINT = "/reservations";

const create = async (data: any) => {
  const response = await api.post(ENDPOINT, data);
  return response.data;
};

const getMyReservations = async () => {
  const response = await api.get(`${ENDPOINT}/me`);
  return response.data;
}

const ReservationService = {
  create,
  getMyReservations,
};

export default ReservationService;
