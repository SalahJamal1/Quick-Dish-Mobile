import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Loader() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={100} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
