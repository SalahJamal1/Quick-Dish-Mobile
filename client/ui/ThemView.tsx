import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
};

export default function ThemView({ children }: Props) {
  return <SafeAreaView style={styles.view}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
