import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ApiLogin } from "../api/ApiAuth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IState } from "../store/store";
import {
  IAction,
  IError,
  IUser,
  User_ERORR,
  User_Login,
} from "../components/user/userSlice";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackButton from "../ui/BackButton";
import ThemView from "../ui/ThemView";

export default function login() {
  const { err } = useSelector((store: IState) => store.user);
  const errors: IError = { ...(err as IError) };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(User_ERORR({ type: "CLEARE_ERROR", value: "" }));
  }, []);
  const router = useRouter();
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  const isValid = (): boolean => {
    const tempError: Record<string, string> = {};
    if (!formData.email.trim()) tempError.email = "Please enter your Email";
    if (!formData.password.trim())
      tempError.password = "Please enter your Password";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email.trim() && !regex.test(formData.email))
      tempError.email = "Email is invalid";

    Object.entries(tempError).forEach(([key, value]) => {
      dispatch(
        User_ERORR({
          type: `ERROR_${key.toUpperCase()}` as IAction["type"],
          value,
        })
      );
    });
    return Object.keys(tempError).length === 0;
  };

  const onChangeText = (v: string, name: keyof IUser) => {
    setData((prev) => ({ ...prev, [name]: v }));
    dispatch(
      User_ERORR({
        type: `ERROR_${name.toUpperCase()}` as IAction["type"],
        value: "",
      })
    );
  };

  const onSubmit = async () => {
    if (!isValid()) return;
    try {
      const res = await ApiLogin(formData);
      const token = res.data.token;
      AsyncStorage.setItem("jwt", token);
      dispatch(User_Login(res.data.user));
      router.push("cart");
      Toast.show({
        type: "success",
        topOffset: 100,
        text1: "You have logged in successfully",
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const message: string =
          err.response.data.ErrorMessage ||
          err.response.data.errors.Email[0] ||
          "Something went wrong";
        Toast.show({
          type: "error",
          topOffset: 100,
          text1: message,
        });
      } else console.error(err);
    }
  };
  return (
    <>
      <ThemView>
        <BackButton />
        <View style={styles.view}>
          <Text style={styles.title}>Ready to order? Let's go!</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="John@example.com"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(v) => onChangeText(v, "email")}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.password}
            onChangeText={(v) => onChangeText(v, "password")}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <Link href="/signup" style={styles.signup}>
            Create Account
          </Link>
        </View>
      </ThemView>
      <Pressable style={styles.login} onPress={onSubmit}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    paddingTop: 10,
    letterSpacing: 3,
    fontWeight: "600",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 5,
  },
  error: {
    marginTop: 5,
    color: "red",
    marginBottom: 5,
    fontSize: 16,
  },
  login: {
    backgroundColor: "rgb(19 28 36)",
    width: "100%",
    height: 70,
    bottom: 0,

    position: "static",
  },
  signup: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "rgb(19 28 36)",
    borderRadius: 7,
    padding: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgb(19 28 36)",
    height: 45,
    borderRadius: 7,
    paddingHorizontal: 7,
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  view: {
    flex: 1,
    marginHorizontal: 30,
    display: "flex",
  },
});
