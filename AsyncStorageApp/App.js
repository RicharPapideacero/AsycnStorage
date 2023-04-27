import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

//yarn add @react-native-community/async-storage

export default function App() {
  const [Nombre, setNombre] = useState("");
  const [Contraseña, setContraseña] = useState("");

  _confirmarbutton = async () => {
    const Arraydata = [];
    if (Nombre !== "" && Contraseña !== "") {
      const data = {
        dNombre: Nombre,
        dContraseña: Contraseña,
      };
      Arraydata.push(data);
      try {
        await AsyncStorage.getItem("users").then((value) => {
          if (value !== null) {
            const d = JSON.parse(value);
            d.push(data);
            AsyncStorage.setItem("users", JSON.stringify(d));
            console.log("Se agrego otro mas.");
          } else {
            AsyncStorage.setItem("users", JSON.stringify(Arraydata));
            console.log("Se hizo por primera vez");
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("no");
    }
  };

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("users");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  Eliminar = async () => {
    try {
      await AsyncStorage.removeItem("users");
    } catch (e) {}

    console.log("Done.");
  };

  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
    }
  
    console.log(keys)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>Formulario</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNombre}
        placeholder="Escribe tu nombre"
      />
      <TextInput
        style={styles.input}
        onChangeText={setContraseña}
        placeholder="Escribe una contraseña"
      />
      <Button title="Enviar formulario" onPress={() => _confirmarbutton()} />
      <Button title="ver usuarios" onPress={() => getUser()} />
      <Button title="Eliminar" onPress={() => Eliminar()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textstyle: {
    padding: 20,
  },
  input: {
    height: 50,
    textAlignVertical: "top",
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 1,
    minWidth: 200,
    margin: 20,
  },
});
