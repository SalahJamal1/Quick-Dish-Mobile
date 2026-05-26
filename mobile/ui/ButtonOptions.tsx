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
      <Pressable style={styles.btn} onPress={() => dispatch(DecItem(id))}>
        <Text style={styles.operator}>-</Text>
      </Pressable>
      <Text style={styles.text}>{quantity}</Text>
      <Pressable style={styles.btn} onPress={() => dispatch(IncItem(id))}>
        <Text style={styles.operator}>+</Text>
      </Pressable>
      <Pressable
        style={styles.deleteBtn}
        onPress={() => dispatch(DeletItem(id))}
      >
        <AntDesign name="delete" size={14} color="#EF4444" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    alignSelf: "center",
  },
  btn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  operator: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5A36",
    lineHeight: 18,
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginHorizontal: 10,
    minWidth: 10,
    textAlign: "center",
  },
  deleteBtn: {
    marginLeft: 5,
    marginRight: 2,
    padding: 5,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
  },
});
