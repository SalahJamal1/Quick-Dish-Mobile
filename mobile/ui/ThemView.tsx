import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  children: ReactNode;
};

export default function ThemView({ children }: Props) {
  return <View style={styles.view}>{children}</View>;
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
