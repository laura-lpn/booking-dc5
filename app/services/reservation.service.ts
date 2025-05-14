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

const remove = async (reservationId: string) => {
  const response = await api.delete(`${ENDPOINT}/${reservationId}`);
  return response.data;
}

const ReservationService = {
  create,
  getMyReservations,
  remove,
};

export default ReservationService;
