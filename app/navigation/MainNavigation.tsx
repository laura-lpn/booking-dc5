import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AuthNavigation from "./AuthNavigation";

const MainNavigation = () => {
  const { user } = useContext(AuthContext);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigation} options={{headerShown: false}}  />
        ) : (
          <Stack.Screen name="Tab" component={TabNavigation} options={{headerShown: false}}  />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
