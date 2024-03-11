import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const app = axios.create({
  baseURL: "https://insta-mn2w.onrender.com",
});

function Enter() {
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const emailLoginRef = useRef("");
  const emailRegisterRef = useRef("");
  const senhaLoginRef = useRef("");
  const senhaRegisterRef = useRef("");
  const senha2RegisterRef = useRef("");
  const nameRegisterRef = useRef("");
  const codeRef = useRef("");

  const code = useRef("");

  const sregistrar = () => {
    setIsActive(!isActive);
  };

  const slogar = () => {
    setIsActive(false);
  };

  const logar = async () => {
    const email = emailLoginRef.current;
    const password = senhaLoginRef.current;

    if (email && password) {
      try {
        const result = await app
          .post("/login", { email, password })
          .then((result) => result.data);

        await AsyncStorage.setItem("token", result);

        const tok = await AsyncStorage.getItem("token");

        console.log("token", tok);

        setTimeout(async () => {
          navigation.navigate("Start" as never);
        }, 500);
      } catch (error: any) {
        console.log(error);

        alert("Erro ao logar: " + error);
      }
    }
  };

  const enviarCodigo = async () => {
    const email = emailRegisterRef.current;

    if (email) {
      try {
        const cod = await app
          .get(`/email/${email}`)
          .then((result) => result.data);

        code.current = cod;
        console.log(code);

        setShowVerification(true);
      } catch (error) {
        console.error("Erro ao enviar email:", error);
      }
    }
  };

  const registrar = async () => {
    const codInput = codeRef.current;

    if (code.current == codInput) {
      const name = nameRegisterRef.current;
      const email = emailRegisterRef.current;
      const password = senhaRegisterRef.current;
      const senha2 = senha2RegisterRef.current;
      const body = {
        name,
        email,
        password,
      };

      if (name && email && password && senha2 && password === senha2) {
        try {
          const result = await app
            .post("/register", body)
            .then((result) => result.data);
          console.log(result);

          await AsyncStorage.setItem("token", result);
          setTimeout(() => {
            navigation.navigate("Start" as never);
          }, 500);
        } catch (error) {
          console.error("Erro ao registrar:", error);
        }
      } else {
        alert("As senhas precisam ser iguais!");
      }
    } else {
      alert(
        "O código de verificação está errado! Tente novamente ou solicite outro"
      );
    }
  };

  const fechar = () => {
    setShowVerification(false);
  };

  return (
    <View style={styles.container}>
      {showVerification && (
        <View style={styles.formContainer}>
          <Text onPress={fechar} style={styles.closeIcon}>X</Text>
          <View>
            <Text>DIGITE O CÓDIGO DE VERIFICAÇÃO</Text>
            <TextInput
              style={styles.input}
              placeholder="código"
              onChangeText={(text) => {
                codeRef.current = text;
              }}
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.button} onPress={registrar}>
              <Text style={styles.buttonText}>VERIFICAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.formContainer}>
        <Text style={styles.title}>{isActive ? "CRIE SUA CONTA" : "LOGIN"}</Text>
        {isActive ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome:"
              onChangeText={(text) => {
                nameRegisterRef.current = text;
              }}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Email:"
              onChangeText={(text) => {
                emailRegisterRef.current = text;
              }}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha:"
              onChangeText={(text) => {
                senhaRegisterRef.current = text;
              }}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Repita sua senha:"
              onChangeText={(text) => {
                senha2RegisterRef.current = text;
              }}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={enviarCodigo}>
              <Text style={styles.buttonText}>REGISTRE-SE</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email:"
              onChangeText={(text) => {
                emailLoginRef.current = text;
              }}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha:"
              onChangeText={(text) => {
                senhaLoginRef.current = text;
              }}
              secureTextEntry={true}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={logar}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.formContainer}>
        <TouchableOpacity onPress={slogar}>
          <View>
            <Text style={styles.paragraph}>{isActive ? "Já tem uma conta?" : "Não tem uma conta?"}</Text>
            <TouchableOpacity style={styles.button} onPress={sregistrar}>
              <Text style={styles.buttonText}>{isActive ? "ENTRE" : "REGISTRE-SE"}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
}

export default Enter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: 'center',
  },
  title:{
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
  },
  formContainer: {
    color: "#fff",
    padding: "5%",
  },
  paragraph: {
    color: "#fff",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#363636",
    margin: 5,
    height: 30,
    padding: 5,
    borderRadius: 5,
    color: "#d4d4d4"
  },
  closeIcon: {
    color: "#fff",
    left: "70%",
    top: 10
  },
  button: {
    backgroundColor: "#750000",
    margin: 5,
    height: 30,
    padding: 5,
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#fff"
  }
});
