import ClassroomsScreen from "../screens/ClassroomsScreen";
import ClassroomDetailScreen from "../screens/ClassroomDetailScreen";
import { createStackNavigator } from "@react-navigation/stack";

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
    </Stack.Navigator>
  );
};

export default ClassroomStack;
