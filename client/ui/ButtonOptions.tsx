import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DecItem, DeletItem, IncItem } from "../components/cart/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import AntDesign from "@expo/vector-icons/AntDesign";
type Props = {
  id: string;
  quantity: number;
};

export default function ButtonOptions({ id, quantity }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View style={styles.view}>
      <Pressable onPress={() => dispatch(IncItem(id))}>
        <Text style={styles.inc}>+</Text>
      </Pressable>
      <Text style={styles.text}>{quantity}</Text>
      <Pressable
        style={{
          marginRight: 10,
        }}
        onPress={() => dispatch(DecItem(id))}
      >
        <Text style={styles.dec}>-</Text>
      </Pressable>
      <Pressable onPress={() => dispatch(DeletItem(id))}>
        <AntDesign name="delete" size={20} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  inc: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "600",
  },
  text: {
    fontSize: 18,
    marginHorizontal: 7,
    fontWeight: "700",
  },
  dec: {
    fontSize: 20,
    fontWeight: "600",
  },
});
