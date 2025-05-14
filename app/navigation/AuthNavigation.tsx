import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";

const AuthNavigation = () => {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
