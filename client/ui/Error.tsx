import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  error: string;
};

export default function Error({ error }: Props) {
  return (
    <View style={styles.view}>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  error: {
    color: "red",
    fontSize: 18,
    fontWeight: "500",
  },
});
