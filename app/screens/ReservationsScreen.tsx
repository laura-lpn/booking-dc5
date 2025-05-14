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
  const [upcomingReservations, setUpcomingReservations] = useState<
    IReservation[]
  >([]);
  const [inProgressReservations, setInProgressReservations] = useState<
    IReservation[]
  >([]);
  const [pastReservations, setPastReservations] = useState<IReservation[]>([]);
  const [viewMode, setViewMode] = useState<"upcoming" | "inProgress" | "past">(
    "inProgress"
  );
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.reservations || user.reservations.length === 0) {
      fetchUserReservations();
    } else {
      setReservations(user.reservations);
    }
  }, [user]);

  useEffect(() => {
    if (reservations.length) {
      const now = new Date();

      const upcoming = reservations.filter((reservation) => {
        const startDate = new Date(reservation.startTime);
        return startDate > now;
      });

      const inProgress = reservations.filter((reservation) => {
        const startDate = new Date(reservation.startTime);
        const endDate = new Date(reservation.endTime);
        return startDate <= now && endDate >= now;
      });

      const past = reservations.filter((reservation) => {
        const endDate = new Date(reservation.endTime);
        return endDate < now;
      });

      setUpcomingReservations(upcoming);
      setInProgressReservations(inProgress);
      setPastReservations(past);
    }
  }, [reservations]);

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

  const toggleView = (mode: "upcoming" | "inProgress" | "past") => {
    setViewMode(mode);
  };

  return (
    <View style={styles.container}>
      {/* Toggle Buttons */}
      <View style={styles.toggleButtonsContainer}>
        <Button
          mode={viewMode === "upcoming" ? "contained" : "outlined"}
          onPress={() => toggleView("upcoming")}
          style={styles.toggleButton}
        >
          À venir
        </Button>
        <Button
          mode={viewMode === "inProgress" ? "contained" : "outlined"}
          onPress={() => toggleView("inProgress")}
          style={styles.toggleButton}
        >
          En cours
        </Button>
        <Button
          mode={viewMode === "past" ? "contained" : "outlined"}
          onPress={() => toggleView("past")}
          style={styles.toggleButton}
        >
          Passées
        </Button>
      </View>

      {/* Réservations à venir */}
      {viewMode === "upcoming" && (
        <View style={styles.reservationContainer}>
          {upcomingReservations.length ? (
            upcomingReservations.map((reservation) => (
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
            ))
          ) : (
            <Text style={styles.text}>Aucune réservation à venir.</Text>
          )}
        </View>
      )}

      {/* Réservations en cours */}
      {viewMode === "inProgress" && (
        <View style={styles.reservationContainer}>
          {inProgressReservations.length ? (
            inProgressReservations.map((reservation) => (
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
            ))
          ) : (
            <Text style={styles.text}>Aucune réservation en cours.</Text>
          )}
        </View>
      )}

      {/* Réservations passées */}
      {viewMode === "past" && (
        <View style={styles.reservationContainer}>
          {pastReservations.length ? (
            pastReservations.map((reservation) => (
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
            ))
          ) : (
            <Text style={styles.text}>Aucune réservation passée.</Text>
          )}
        </View>
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
  toggleButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    marginHorizontal: 10,
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
