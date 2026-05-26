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
import ThemView from "../ui/ThemView";

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
      <ThemView>
        <BackButton />
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to start enjoying premium meals delivered to your doorstep. 🛵</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.view}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="First name"
              placeholderTextColor="#94A3B8"
              style={[styles.input, errors.firstName && styles.inputError]}
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
              placeholder="Last name"
              placeholderTextColor="#94A3B8"
              style={[styles.input, errors.lastName && styles.inputError]}
              textContentType="name"
              autoCapitalize="none"
              autoCorrect={false}
              value={formData.lastName}
              onChangeText={(v) => onChangeText(v, "lastName")}
            />
            {errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="John@example.com"
              placeholderTextColor="#94A3B8"
              style={[styles.input, errors.email && styles.inputError]}
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCorrect={false}
              value={formData.email}
              onChangeText={(v) => onChangeText(v, "email")}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Delivery Address</Text>
            <TextInput
              placeholder="Your delivery address"
              placeholderTextColor="#94A3B8"
              style={[styles.input, errors.Address && styles.inputError]}
              textContentType="fullStreetAddress"
              autoCapitalize="none"
              autoCorrect={false}
              value={formData.Address}
              onChangeText={(v) => onChangeText(v, "Address")}
            />
            {errors.Address && (
              <Text style={styles.error}>{errors.Address}</Text>
            )}

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              placeholder="Phone number"
              placeholderTextColor="#94A3B8"
              style={[styles.input, errors.phoneNumber && styles.inputError]}
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={(v) => onChangeText(v, "phoneNumber")}
            />
            {errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Create a strong password"
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

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm your password"
              placeholderTextColor="#94A3B8"
              style={[styles.input, errors.passwordConfirm && styles.inputError]}
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
      </ThemView>
      <View style={styles.bottomBar}>
        <Pressable style={styles.signup} onPress={onSubmit}>
          <Text style={styles.text}>Create Account</Text>
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
  header: {
    paddingHorizontal: 30,
    marginBottom: 10,
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
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 1.0,
    marginBottom: 6,
    marginTop: 14,
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
  signup: {
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
  scrollContent: {
    paddingBottom: 30,
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
  view: {
    marginHorizontal: 30,
    paddingBottom: 20,
  },
});
