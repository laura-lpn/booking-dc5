import { useState } from "react";
import ClassroomService from "../services/classroom.service";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const AddClassroomScreen = () => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [equipments, setEquipments] = useState([""]);
  const navigation = useNavigation();

  const handleAddClassroom = async () => {
    const newClassroom = {
      name,
      capacity: parseInt(capacity, 10),
      equipment: equipments.map((item) => item.trim()),
    };
    const response = await ClassroomService.create(newClassroom);
    if (response) {
      navigation.navigate("ClassroomsHome");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput label="Nom de la salle" onChangeText={setName} keyboardType="numeric" />
        <TextInput
          label="Capacité"
          keyboardType="numeric"
          onChangeText={setCapacity}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Équipements"
          onChangeText={(text) =>
            setEquipments(text.split(",").map((item) => item.trim()))
          }
          placeholder="Séparez les équipements par des virgules"
          style={styles.input}
          mode="outlined"
        />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleAddClassroom}
      >
        Ajouter la salle
      </Button>
    </View>
  );
};

export default AddClassroomScreen;

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
