import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../../models/user";

const app = axios.create({
  baseURL: "https://insta-mn2w.onrender.com",
});

function Search() {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation();
  const nameRef = useRef(null);

  const search = async () => {
    try {
      const nomeInput = nameRef.current;

      if (!nomeInput || nomeInput == null) {
        return;
      }

      const result = await app.get("/find/" + nomeInput);
      if (result.data.length === 0) {
        setUsers([{name: "NENHUM USUÁRIO ENCONTRADO", email: "nenhum"}]);
      } else {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changePage = async (profile: User) => {
    if (profile.email == "nenhum") {
      return;
    }
    const token = await app.post("/code", {profile});
    await AsyncStorage.setItem("search", token.data); 
    setTimeout(() => {
      navigation.navigate("ProfileAnother" as never);
    }, 100);
  }

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Enter" as never)}>
        <Text style={styles.buttonText}>🌐</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Search" as never)}>
        <Text style={styles.buttonText}>🔬</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfileUser" as never)}>
        <Text style={styles.buttonText}>🏠</Text>
      </TouchableOpacity>
    </View>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Nome do usuário:"
          onChangeText={search}
          ref={nameRef}
        />
        <View style={styles.users}>
          {users.map((user, index) => (
            <TouchableOpacity key={index} style={styles.user} onPress={() => changePage(user)}>
              <Image
                style={styles.userImage}
                source={{ uri: user.picture || 'https://icones.pro/wp-content/uploads/2021/02/icono-de-camara-gris.png' }}
              />
              <Text>{user.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  content: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  users: {
    flexDirection: "column",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#520000",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#ddd",
    fontSize: 20,
  },
});

export default Search;