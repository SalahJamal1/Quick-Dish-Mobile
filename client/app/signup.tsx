import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  IAction,
  IError,
  IUser,
  User_ERORR,
} from "../components/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IState } from "../store/store";
import { ApiSignup } from "../api/ApiAuth";
import axios from "axios";
import Toast from "react-native-toast-message";
import BackButton from "../ui/BackButton";

export default function Signup() {
  const { err } = useSelector((store: IState) => store.user);
  const errors = { ...(err as IError) };
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  useEffect(() => {
    dispatch(User_ERORR({ type: "CLEARE_ERROR", value: "" }));
  }, []);
  const [formData, setData] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    Address: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  });

  const onChangeText = (value: string, name: keyof IUser) => {
    setData((prev) => ({ ...prev, [name]: value }));
    dispatch(
      User_ERORR({
        type: `ERROR_${name.toUpperCase()}` as IAction["type"],
        value: "",
      })
    );
  };
  const isValid = (): boolean => {
    const tempError: Record<string, string> = {};

    if (!formData.firstName?.trim())
      tempError.firstName = "Please enter your First Name";
    if (!formData.lastName?.trim())
      tempError.lastName = "Please enter your Last Name";
    if (!formData.Address?.trim())
      tempError.Address = "Please enter your Address";
    if (!formData.passwordConfirm?.trim())
      tempError.passwordConfirm = "Please Confirm your password";
    if (!formData.phoneNumber?.trim())
      tempError.phoneNumber = "Please enter your phone";

    if (!formData.email.trim()) tempError.email = "Please enter your Email";
    if (!formData.password.trim())
      tempError.password = "Please enter your Password";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(tempError);
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

  const onSubmit = async () => {
    if (!isValid()) return;
    try {
      const res = await ApiSignup(formData);
      router.push("/");
      Toast.show({
        type: "success",
        topOffset: 100,
        text1: "You have been registered successfully.",
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data.errors);
        const message: string =
          err?.response?.data?.ErrorMessage ??
          err?.response?.data?.errors?.Email?.[0] ??
          err?.response?.data?.errors?.PhoneNumber?.[0] ??
          err?.response?.data?.errors?.Password?.[0] ??
          err?.response?.data?.errors?.PasswordConfirm?.[0] ??
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
      <BackButton />
      <Text style={styles.title}>Ready to order? Let's go!</Text>
      <ScrollView>
        <View style={styles.view}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            textContentType="name"
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.firstName}
            onChangeText={(v) => onChangeText(v, "firstName")}
          />
          {errors.firstName && (
            <Text style={styles.error}>{errors.firstName}</Text>
          )}
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            textContentType="name"
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.lastName}
            onChangeText={(v) => onChangeText(v, "lastName")}
          />
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="John@example.com"
            style={styles.input}
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.email}
            onChangeText={(v) => onChangeText(v, "email")}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder="Address"
            style={styles.input}
            textContentType="addressState"
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.Address}
            onChangeText={(v) => onChangeText(v, "Address")}
          />
          {errors.Address && <Text style={styles.error}>{errors.Address}</Text>}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            placeholder="Phone"
            style={styles.input}
            textContentType="telephoneNumber"
            value={formData.phoneNumber}
            onChangeText={(v) => onChangeText(v, "phoneNumber")}
          />
          {errors.phoneNumber && (
            <Text style={styles.error}>{errors.phoneNumber}</Text>
          )}
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
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={true}
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.passwordConfirm}
            onChangeText={(v) => onChangeText(v, "passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <Text style={styles.error}>{errors.passwordConfirm}</Text>
          )}
        </View>
      </ScrollView>
      <Pressable style={styles.signup} onPress={onSubmit}>
        <Text style={styles.text}> Create Account</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    paddingTop: 15,
    letterSpacing: 3,
    fontWeight: "600",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },
  error: {
    marginTop: 5,
    color: "red",

    fontSize: 16,
  },
  signup: {
    backgroundColor: "rgb(19 28 36)",
    width: "100%",
    height: 70,
    bottom: 0,

    position: "static",
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
    marginBottom: 10,
    marginLeft: 30,
  },
  view: {
    marginHorizontal: 30,
  },
});
