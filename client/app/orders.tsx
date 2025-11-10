import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { IState } from "../store/store";
import UserLoader from "../components/user/UserLoader";
import LoginMessage from "../ui/LoginMessage";
import OrderItem from "../components/order/OrderItem";
import ThemView from "../ui/ThemView";
import BackButton from "../ui/BackButton";

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
      <FlatList
        data={order}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <OrderItem item={item} />;
        }}
      />
    </ThemView>
  );
}
