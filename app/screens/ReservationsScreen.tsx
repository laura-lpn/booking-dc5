import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { IReservation } from "../types/reservation.type";
import ReservationService from "../services/reservation.service";
import AuthContext from "../context/AuthContext";
import { Card } from "react-native-paper";

const formatDateTime = (datetime: string | number | Date) => {
  const date = new Date(datetime);
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ReservationsScreen = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUserReservations();
  }, [user]);

  const fetchUserReservations = async () => {
    const response = await ReservationService.getMyReservations();
    setReservations(response);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Réservations</Text>
      {reservations?.length ? (
        <View style={styles.reservationContainer}>
          {reservations.map((reservation) => (
            <Card key={reservation.id}>
              <Card.Content>
                <Text style={styles.reservationText}>
                  Du {formatDateTime(reservation.startTime)} à{" "}
                  {formatDateTime(reservation.endTime)}
                </Text>
                <Text style={styles.classroomText}>
                  Salle : {reservation.classroom.name}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      ) : (
        <Text style={styles.text}>Aucune réservation.</Text>
      )}
    </View>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  reservationContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  reservationText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
  classroomText: {
    fontSize: 14,
    color: "#777",
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: "center",
    color: "#555",
  },
});
