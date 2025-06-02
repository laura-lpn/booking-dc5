import ClassroomsScreen from "../screens/ClassroomsScreen";
import ClassroomDetailScreen from "../screens/ClassroomDetailScreen";
import AddClassroomScreen from "../screens/AddClassroomScreen";
import { createStackNavigator } from "@react-navigation/stack";
import EditClassroomScreen from "../screens/EditClassroomScreen";

const ClassroomStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClassroomsHome"
        component={ClassroomsScreen}
        options={{ title: "Liste des salles" }}
      />
      <Stack.Screen
        name="ClassroomDetail"
        component={ClassroomDetailScreen}
        options={{ title: "Détail de la salle" }}
      />
      <Stack.Screen
        name="AddClassroom"
        component={AddClassroomScreen}
        options={{ title: "Ajouter une salle" }}
      />
      <Stack.Screen
        name="EditClassroom"
        component={EditClassroomScreen}
        options={{ title: "Modifier la salle" }}
      />
    </Stack.Navigator>
  );
};

export default ClassroomStack;
