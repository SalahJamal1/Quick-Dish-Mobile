import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function CartEmpty() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="shopping-bag" size={40} color="#FF5A36" />
      </View>
      <Text style={styles.title}>Your Cart is Empty</Text>
      <Text style={styles.description}>
        Add delicious pizzas, shawarma, and burger specialties to your cart and place your order today!
      </Text>
      <Link href="/" asChild>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Explore Menu</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#F8FAFC",
    paddingTop: 100,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFEBE7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 25,
  },
  btn: {
    backgroundColor: "#FF5A36",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: "#FF5A36",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  btnText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
