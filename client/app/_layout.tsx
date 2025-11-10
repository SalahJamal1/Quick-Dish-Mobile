import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import UserLoader from "../components/user/UserLoader";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";

export default function RootLayout() {
  const toastConfig = {
    success: (props: any) => (
      <SuccessToast
        {...props}
        style={{
          borderLeftColor: "green",
          backgroundColor: "#222",
          flexWrap: "wrap",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 12,
          color: "#fff",
          textTransform: "capitalize",
          flexWrap: "wrap",
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "red",
          backgroundColor: "#222",
          width: 400,
          flexWrap: "wrap",
        }}
        text1Style={{
          color: "#fff",
          fontSize: 12,
          textTransform: "capitalize",
          flexWrap: "wrap",
        }}
      />
    ),
  };

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <UserLoader />
      <Stack
        screenOptions={{
          headerTitle: "Quick Dish",
          headerStyle: { backgroundColor: "rgb(19 28 36)" },
          headerTitleStyle: { fontSize: 18 },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerBackTitle: "Back",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="orders" />
      </Stack>
      <Toast config={toastConfig} />
    </Provider>
  );
}
