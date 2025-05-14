import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Card } from "react-native-paper";
import ClassroomService from "../services/classroom.service";
import ReservationService from "../services/reservation.service";
import AuthContext from "../context/AuthContext";
import { IClassroom } from "../types/classroom.type";
import { RouteProp } from "@react-navigation/native";

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

const ClassroomDetailScreen = ({
  route,
}: {
  route: RouteProp<{ params: { id: string } }, "params">;
}) => {
  const { id } = route.params;
  const { user, setUser } = useContext(AuthContext);
  const [classroomDetails, setClassroomDetails] = useState<IClassroom | null>(
    null
  );

  const [startDate, setStartDate] = useState(new Date());
  const [startTimeOnly, setStartTimeOnly] = useState(new Date());
  const [showDatePickerStart, setShowDatePickerStart] = useState(false);
  const [showTimePickerStart, setShowTimePickerStart] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [endTimeOnly, setEndTimeOnly] = useState(new Date());
  const [showDatePickerEnd, setShowDatePickerEnd] = useState(false);
  const [showTimePickerEnd, setShowTimePickerEnd] = useState(false);

  useEffect(() => {
    fetchClassroomDetails();
  }, [id]);

  const fetchClassroomDetails = async () => {
    const response = await ClassroomService.fetchById(id);
    setClassroomDetails(response);
  };

  const getCombinedDateTime = (date: Date, time: Date) => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    return combined;
  };

  const handleReserve = async () => {
    const start = getCombinedDateTime(startDate, startTimeOnly);
    const end = getCombinedDateTime(endDate, endTimeOnly);

    if (end <= start) {
      alert("La date de fin doit être après la date de début.");
      return;
    }

    try {
      await ReservationService.create({
        classroomId: id,
        userId: user!.id,
        startTime: new Date(start).toISOString(),
        endTime: new Date(end).toISOString(),
      });
      alert("Réservation enregistrée !");
      fetchClassroomDetails();
      if (user) {
        const updatedUser = await ReservationService.getMyReservations();
        setUser({ ...user, reservations: updatedUser });
      }
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert("Erreur lors de la réservation.");
    }
  };

  return (
    <View style={styles.container}>
      {classroomDetails && (
        <>
          <Text style={styles.title}>{classroomDetails.name}</Text>
          <Text style={styles.text}>
            Capacité : {classroomDetails.capacity}
          </Text>
          <Text style={styles.text}>
            Équipements : {classroomDetails.equipment.join(", ")}
          </Text>

          <Text style={styles.subtitle}>Réservations :</Text>

          {classroomDetails.reservations?.length ? (
            <View style={styles.classroomsContainer}>
              {classroomDetails.reservations.map((reservation) => (
                <Card key={reservation.id}>
                  <Card.Content>
                    <Text style={styles.reservationText}>
                      De {formatDateTime(reservation.startTime)} à{" "}
                      {formatDateTime(reservation.endTime)}
                    </Text>
                    <Text style={styles.reservationUser}>
                      Par : {reservation.user.name}
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </View>
          ) : (
            <Text style={styles.text}>Aucune réservation.</Text>
          )}

          <View style={styles.formGroup}>
            <Text style={styles.formSectionTitle}>
              Date et Heure de début :
            </Text>
            <View style={styles.ButtonContainer}>
              <Button
                mode="outlined"
                style={styles.dateButton}
                onPress={() => setShowDatePickerStart(true)}
              >
                {startDate.toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Button>
              {showDatePickerStart && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePickerStart(false);
                    if (selectedDate) setStartDate(selectedDate);
                  }}
                />
              )}
              <Button
                mode="outlined"
                onPress={() => setShowTimePickerStart(true)}
              >
                {startTimeOnly.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Button>
              {showTimePickerStart && (
                <DateTimePicker
                  value={startTimeOnly}
                  mode="time"
                  is24Hour
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePickerStart(false);
                    if (selectedTime) setStartTimeOnly(selectedTime);
                  }}
                />
              )}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formSectionTitle}>Date et Heure de fin :</Text>
            <View style={styles.ButtonContainer}>
              <Button
                mode="outlined"
                style={styles.dateButton}
                onPress={() => setShowDatePickerEnd(true)}
              >
                {endDate.toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Button>
              {showDatePickerEnd && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePickerEnd(false);
                    if (selectedDate) setEndDate(selectedDate);
                  }}
                />
              )}
              <Button
                mode="outlined"
                onPress={() => setShowTimePickerEnd(true)}
              >
                {endTimeOnly.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Button>
              {showTimePickerEnd && (
                <DateTimePicker
                  value={endTimeOnly}
                  mode="time"
                  is24Hour
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePickerEnd(false);
                    if (selectedTime) setEndTimeOnly(selectedTime);
                  }}
                />
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleReserve}>
              Réserver
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default ClassroomDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
  },
  classroomsContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  reservationText: {
    fontSize: 15,
  },
  reservationUser: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    marginTop: 10,
  },
  formGroup: {
    marginVertical: 10,
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    marginBottom: 10,
  },
  dateButton: {
    marginRight: 10,
  },
});
