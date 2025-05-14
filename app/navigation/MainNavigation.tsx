import { createStackNavigator } from "@react-navigation/stack"
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
          <Stack.Screen name="Auth" component={AuthNavigation} />
        ) : (
          <Stack.Screen name="Tab" component={TabNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
