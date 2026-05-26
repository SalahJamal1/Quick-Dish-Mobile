import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { IState } from "../store/store";
import UserLoader from "../components/user/UserLoader";
import LoginMessage from "../ui/LoginMessage";
import OrderItem from "../components/order/OrderItem";
import ThemView from "../ui/ThemView";
import BackButton from "../ui/BackButton";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";

export default function orders() {
  const { user, Auth } = useSelector((store: IState) => store.user);
  const order = user?.order
    ? [...user?.order]?.sort((a, b) => +b.id - +a.id)
    : [];

  if (!Auth) return <LoginMessage />;
  return (
    <ThemView>
      <BackButton />
      <UserLoader />
      
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Track your delivery status in real-time</Text>
      </View>

      {order.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.iconCircle}>
            <Feather name="list" size={40} color="#FF5A36" />
          </View>
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptyText}>
            You haven't placed any orders yet. Head over to our menu and grab something delicious!
          </Text>
          <Link href="/" asChild>
            <Pressable style={styles.btn}>
              <Text style={styles.btnText}>Browse Menu</Text>
            </Pressable>
          </Link>
        </View>
      ) : (
        <FlatList
          data={order}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <OrderItem item={item} />;
          }}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </ThemView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 30,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 80,
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
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
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
