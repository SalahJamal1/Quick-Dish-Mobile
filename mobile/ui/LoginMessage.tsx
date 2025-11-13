import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LoginMessage() {
  return (
    <View
      style={{
        marginLeft: 20,
        marginTop: 90,
      }}
    >
      <Text style={styles.msg}>Your are not Login .😜</Text>
      <Link href="login" style={styles.link}>
        Login
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
  msg: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
});
