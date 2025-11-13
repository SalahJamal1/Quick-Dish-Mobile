import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CartEmpty() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        Your cart is still empty. Start adding some pizzas 🍕
      </Text>
      <Link href="/" style={styles.link}>
        Add Items
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 20,
    fontWeight: "700",
    backgroundColor: "rgb(19 28 36)",
    alignSelf: "center",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  view: {
    marginLeft: 20,
    marginTop: 90,
  },
});
