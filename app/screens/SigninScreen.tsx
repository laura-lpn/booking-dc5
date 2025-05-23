import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const SigninScreen = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { signin } = useAuth();

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Signin Screen</Text>

      <TextInput
        placeholder="Email"
        onChangeText={(text) => setCredentials({ ...credentials, email: text })}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) =>
          setCredentials({ ...credentials, password: text })
        }
      />
      <Button
        mode="contained"
        onPress={() => signin(credentials.email, credentials.password)}
      >
        Signin
      </Button>

      <Text>Vous n'avez pas de compte ?</Text>
      {/* change de stack a click */}
      <Button onPress={() => navigation.navigate("Signup")}>S'inscrire</Button>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 20,
  },
});
