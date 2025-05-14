import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import UserService from "../services/user.service";

const ProfilScreen = () => {
  const { signout } = useAuth();
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const updatedUser = await UserService.updateUser(user.id, {
        ...user,
        name,
        email,
      });
      console.log("User updated successfully:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nom"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />

      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Modifier
      </Button>

      <Button mode="outlined" onPress={signout} style={styles.logoutButton}>
        Déconnexion
      </Button>
    </View>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  logoutButton: {
    marginTop: 60,
  },
});
