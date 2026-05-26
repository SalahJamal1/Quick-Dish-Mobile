import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ICart } from "./cartSlice";
import ButtonOptions from "../../ui/ButtonOptions";
import { useSelector } from "react-redux";
import { IState } from "../../store/store";

type Props = {
  item: ICart;
};

export default function CartItem({ item }: Props) {
  const { cart } = useSelector((store: IState) => store.cart);
  const quantity: number | undefined = cart.find(
    (c) => c.id === item.id
  )?.quantity;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.img}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.description || "Delicious meal choice"}
        </Text>
        <View style={styles.footerRow}>
          <Text style={styles.price}>${item.totalPrice}</Text>
          {quantity && (
            <View style={styles.qtyContainer}>
              <ButtonOptions quantity={quantity} id={item.id} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
    alignItems: "center",
  },
  img: {
    height: 74,
    width: 74,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },
  details: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FF5A36",
  },
  qtyContainer: {
    transform: [{ scale: 0.9 }],
  },
});
