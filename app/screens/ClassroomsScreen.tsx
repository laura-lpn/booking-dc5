import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import ClassroomService from "../services/classroom.service";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { IClassroom } from "../types/classroom.type";
import AuthContext from "../context/AuthContext";

const ClassroomsScreen = () => {
  const [classrooms, setClassrooms] = useState<IClassroom[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClassrooms, setFilteredClassrooms] = useState<IClassroom[]>(
    []
  );
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchAllClassrooms();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllClassrooms();
    }, [])
  );

  useEffect(() => {
    filterAndSortClassrooms();
  }, [classrooms, searchQuery, sortBy]);

  const fetchAllClassrooms = async () => {
    const response = await ClassroomService.fetchAll();
    setClassrooms(response);
  };

  const handleViewDetails = (classroomId: number) => {
    navigation.navigate("ClassroomDetail", { id: classroomId });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    setSelectedFilter(criteria);
  };

  const filterAndSortClassrooms = () => {
    let filtered = classrooms.filter((classroom) => {
      const lowerQuery = searchQuery.toLowerCase();
      return (
        classroom.name.toLowerCase().includes(lowerQuery) ||
        classroom.equipment.some((equip) =>
          equip.toLowerCase().includes(lowerQuery)
        )
      );
    });

    if (sortBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "capacity") {
      filtered = filtered.sort((a, b) => a.capacity - b.capacity);
    }

    setFilteredClassrooms(filtered);
  };
  return (
    <ScrollView style={styles.container}>
      {/* boutton d'ajout pour les admin */}
      {user?.role === "ADMIN" && (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("AddClassroom")}
          style={styles.addButton}
        >
          Ajouter une Salle
        </Button>
      )}
      <TextInput
        label="Rechercher par nom ou équipement"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      <View style={styles.filterButtonsContainer}>
        <Button
          mode={selectedFilter === "name" ? "contained" : "outlined"}
          onPress={() => handleSort("name")}
          style={styles.filterButton}
        >
          Trier par Nom
        </Button>
        <Button
          mode={selectedFilter === "capacity" ? "contained" : "outlined"}
          onPress={() => handleSort("capacity")}
          style={styles.filterButton}
        >
          Trier par Capacité
        </Button>
      </View>
      <View style={styles.classroomsContainer}>
        {filteredClassrooms.map((classroom) => (
          <Card key={classroom.id}>
            <Card.Title title={classroom.name} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Text>Capacité : {classroom.capacity}</Text>
              <Text>Équipements : {classroom.equipment.join(", ")}</Text>
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
    </ScrollView>
  );
};

export default ClassroomsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  searchInput: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  classroomsContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
  },
  addButton: {
    marginBottom: 20,
  },
});
