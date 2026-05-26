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
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.img}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.viewInfo}>
          <Text style={styles.price}>${item.unitPrice}</Text>
          {currentQuantity && (
            <ButtonOptions id={item.id} quantity={currentQuantity} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  img: {
    height: 110,
    width: "100%",
    backgroundColor: "#F1F5F9",
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  viewInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 28,
  },
  price: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FF5A36",
  },
});
