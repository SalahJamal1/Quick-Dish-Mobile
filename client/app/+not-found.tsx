import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <View>
      <Text>We Cannot found The Page</Text>
      <Link href="/">Back To Home</Link>
    </View>
  );
}
