import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";

const SignupScreen = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { signup } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Signup Screen</Text>

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
      <TextInput
        placeholder="Nom"
        onChangeText={(text) => setCredentials({ ...credentials, name: text })}
      />
      <Button
        mode="contained"
        onPress={() => signup(credentials.email, credentials.password, credentials.name)}
      >
        S'inscrire
      </Button>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 20,
  },
});
