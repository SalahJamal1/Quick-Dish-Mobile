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
    <View style={styles.view}>
      <View style={styles.viewInfo}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.img}
          resizeMode="cover"
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>

      {quantity && (
        <View>
          <Text style={styles.price}>${item.totalPrice}</Text>
          <ButtonOptions quantity={quantity} id={item.id} />
        </View>
      )}
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
    alignItems: "center",
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginRight: 10,
    objectFit: "cover",
  },
  name: {
    fontSize: 13,
    width: 160,
    letterSpacing: 1,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    alignSelf: "flex-end",
  },
});
