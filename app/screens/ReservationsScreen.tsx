import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { IReservation } from "../types/reservation.type";
import ReservationService from "../services/reservation.service";
import AuthContext from "../context/AuthContext";
import { Button, Card } from "react-native-paper";

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
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.reservations || user.reservations.length === 0) {
      fetchUserReservations();
    } else {
      setReservations(user.reservations);
    }
  }, [user]);

  const fetchUserReservations = async () => {
    try {
      const response = await ReservationService.getMyReservations();
      setReservations(response);
      if (user) {
        setUser({ ...user, reservations: response });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
    }
  };

  const handleDeleteReservation = (reservationId: string) => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cette réservation ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await ReservationService.remove(reservationId);
              const updatedReservations = reservations.filter(
                (reservation) => reservation.id !== reservationId
              );
              setReservations(updatedReservations);
              if (user) {
                setUser({ ...user, reservations: updatedReservations });
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression de la réservation :",
                error
              );
              Alert.alert(
                "Erreur",
                "Une erreur est survenue lors de la suppression."
              );
            }
          },
        },
      ]
    );
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
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => handleDeleteReservation(reservation.id)}
                >
                  Supprimer
                </Button>
              </Card.Actions>
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
