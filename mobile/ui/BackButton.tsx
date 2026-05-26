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
      <Ionicons name="arrow-back" size={16} color="#0F172A" />
      <Text style={styles.text}>Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
});
