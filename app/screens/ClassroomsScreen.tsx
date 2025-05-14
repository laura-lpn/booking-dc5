import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import ClassroomService from "../services/classroom.service";
import { useNavigation } from "@react-navigation/native";
import { IClassroom } from "../types/classroom.type";

const ClassroomsScreen = () => {
  const [classrooms, setClassrooms] = useState<IClassroom[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllClassrooms();
  }, []);

  const fetchAllClassrooms = async () => {
    const response = await ClassroomService.fetchAll();
    setClassrooms(response);
  };

  const handleViewDetails = (classroomId: number) => {
    navigation.navigate("ClassroomDetail", { id: classroomId });
  };

  return (
    <View>
      <View style={styles.classroomsContainer}>
        {classrooms?.map((classroom) => (
          <Card key={classroom.id}>
            <Card.Title title={classroom.name} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Text>{classroom.capacity}</Text>
              <Button
                mode="outlined"
                onPress={() => handleViewDetails(classroom.id)}
                style={styles.button}
              >
                Voir les détails
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default ClassroomsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  classroomsContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold"
    },
  button: {
    marginTop: 10,
  },
});
