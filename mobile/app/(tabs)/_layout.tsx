import { Tabs, usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const router = useRouter();
  const path = usePathname();
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          headerTintColor: "#fff",
          headerLeft: () => {
            return path !== "/" ? (
              <Pressable
                onPress={() => {
                  router.back();
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 12,
                }}
              >
                <Ionicons name="arrow-back-sharp" size={16} color="white" />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "500",
                    marginLeft: 5,
                  }}
                >
                  Back
                </Text>
              </Pressable>
            ) : null;
          },
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#F1F5F9",
            height: 64,
            shadowColor: "#0F172A",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 8,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
          tabBarItemStyle: { paddingVertical: 8, height: 60 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text
                  style={{
                    color: focused ? "#FF5A36" : "#64748B",
                    fontSize: 11,
                    fontWeight: "600",
                    marginTop: 2,
                  }}
                >
                  Home
                </Text>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <AntDesign
                  name="home"
                  size={22}
                  color={focused ? "#FF5A36" : "#64748B"}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text
                  style={{
                    textTransform: "capitalize",
                    fontSize: 11,
                    fontWeight: "600",
                    color: focused ? "#FF5A36" : "#64748B",
                    marginTop: 2,
                  }}
                >
                  Profile
                </Text>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <AntDesign
                  name="user"
                  size={22}
                  color={focused ? "#FF5A36" : "#64748B"}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarStyle: { display: "none" },
            tabBarLabel: ({ focused }) => {
              return (
                <Text
                  style={{
                    textTransform: "capitalize",
                    fontSize: 11,
                    fontWeight: "600",
                    color: focused ? "#FF5A36" : "#64748B",
                    marginTop: 2,
                  }}
                >
                  Cart
                </Text>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <AntDesign
                  name="shopping-cart"
                  size={22}
                  color={focused ? "#FF5A36" : "#64748B"}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="(cart)/[id]"
          options={{ tabBarItemStyle: { display: "none" } }}
        />
      </Tabs>
    </>
  );
}
