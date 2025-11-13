import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IItem } from "./menuSlice";
import { useSelector } from "react-redux";
import { IState } from "../../store/store";
import ButtonOptions from "../../ui/ButtonOptions";

type Props = {
  item: IItem;
};

export default function MenuItem({ item }: Props) {
  const { cart } = useSelector((store: IState) => store.cart);
  const currentQuantity = cart.find((c) => c.id === item.id)?.quantity;
  return (
    <View style={{ marginHorizontal: 20, width: 200 }}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.img}
        resizeMode="cover"
      />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.viewInfo}>
        <Text style={styles.price}>${item.unitPrice}</Text>
        {currentQuantity && (
          <ButtonOptions id={item.id} quantity={currentQuantity} />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 10,
  },
  viewInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    height: 150,
    width: 200,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 16,
    width: 200,
    fontWeight: "500",
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    alignSelf: "flex-end",
  },
});
