import { Text, View } from "react-native";
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

  if (!user) {
    return null;
  }

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
    <View>
      <Text>Profil</Text>

      <TextInput label="Nom" value={name} onChangeText={setName} />
      <TextInput label="Email" value={email} onChangeText={setEmail} />

      <Button onPress={handleUpdate}>Modifier</Button>

      <Button onPress={signout}>Déconnexion</Button>
    </View>
  );
};

export default ProfilScreen;
