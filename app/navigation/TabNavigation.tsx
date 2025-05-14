import ProfilScreen from "../screens/ProfilScreen";
import ReservationsScreen from "../screens/ReservationsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import ClassroomStack from "./ClassroomStack";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Classrooms") {
        iconName = focused ? "school" : "school-outline";
      } else if (route.name === "Profil") {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === "Reservations") {
        iconName = focused ? "calendar" : "calendar-outline";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  });

  return (
    <Tab.Navigator initialRouteName="Profil" screenOptions={screenOptions}>
      <Tab.Screen name="Classrooms" component={ClassroomStack} options={{headerShown: false}} />
      <Tab.Screen name="Profil" component={ProfilScreen} options={{ title: "Profil" }} />
      <Tab.Screen name="Reservations" component={ReservationsScreen} options={{ title: "Mes réservations" }} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
