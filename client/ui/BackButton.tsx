import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { User_ERORR } from "../components/user/userSlice";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BackButton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Pressable
      onPress={() => {
        dispatch(User_ERORR({ type: "CLEARE_ERROR", value: "" }));
        router.back();
      }}
      style={styles.btn}
    >
      <Ionicons name="arrow-back-sharp" size={16} color="dark" />
      <Text style={styles.text}>Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 50,
    marginLeft: 20,
  },
  text: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
  },
});
