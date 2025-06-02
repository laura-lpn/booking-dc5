import { StyleSheet, View } from "react-native";
import { IClassroom } from "../types/classroom.type";
import { useEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import ClassroomService from "../services/classroom.service";
import { Button, TextInput } from "react-native-paper";

const EditClassroomScreen = ({
  route,
}: {
  route: RouteProp<{ params: { id: string } }, "params">;
}) => {
  const { id } = route.params;
  const [classroom, setClassroom] = useState<IClassroom | null>(null);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [equipments, setEquipments] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchClassroomDetails();
  }, [id]);

  const fetchClassroomDetails = async () => {
    const response = await ClassroomService.fetchById(id);
    setName(response.name);
    setCapacity(response.capacity.toString());
    setEquipments(response.equipment || []);
    setClassroom(response);
  };

  const handleUpdateClassroom = async () => {
    if (!classroom) return;
    try {
      const updatedClassroom: IClassroom = {
        ...classroom,
        name,
        capacity: parseInt(capacity, 10),
        equipment: equipments.map((item) => item.trim()),
      };
      const response = await ClassroomService.update(id, updatedClassroom);
      if (response) {
        navigation.navigate("ClassroomDetail", { id: response.id });
      }
    } catch (error) {
      console.error("Error updating classroom:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nom de la salle"
        style={styles.input}
        mode="outlined"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        label="Capacité"
        style={styles.input}
        mode="outlined"
        value={capacity}
        onChangeText={setCapacity}
        keyboardType="numeric"
      />
      <TextInput
        label="Équipements"
        style={styles.input}
        mode="outlined"
        value={equipments.join(", ")}
        onChangeText={(text) =>
          setEquipments(text.split(", ").map((item) => item.trim()))
        }
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleUpdateClassroom}
      >
        Modifier
      </Button>
    </View>
  );
};

export default EditClassroomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginTop: 12,
  },
  input: {
    marginBottom: 12,
  },
});
