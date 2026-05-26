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
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Log in to order and experience delicious food delivered fast. ⚡</Text>

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            placeholder="John@example.com"
            placeholderTextColor="#94A3B8"
            style={[styles.input, errors.email && styles.inputError]}
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
            placeholder="Enter your password"
            placeholderTextColor="#94A3B8"
            style={[styles.input, errors.password && styles.inputError]}
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

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Link href="/signup" style={styles.signupLink}>
              Create one
            </Link>
          </View>
        </View>
      </ThemView>
      <View style={styles.bottomBar}>
        <Pressable style={styles.login} onPress={onSubmit}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: "700",
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 1.0,
    marginBottom: 6,
    marginTop: 15,
  },
  error: {
    marginTop: 4,
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "600",
  },
  bottomBar: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
  },
  login: {
    backgroundColor: "#FF5A36",
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5A36",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  signupText: {
    fontSize: 14,
    color: "#64748B",
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5A36",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#0F172A",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 20,
  },
  view: {
    flex: 1,
    marginHorizontal: 30,
    paddingTop: 10,
  },
});
