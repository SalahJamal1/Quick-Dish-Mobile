import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IOrder } from "../user/userSlice";

type Props = {
  item: IOrder;
};

const Dateformat = (date: string): string => {
  return new Intl.DateTimeFormat("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};
const calcMin = (date: string): number => {
  const diffMs = new Date(date).getTime() - new Date().getTime();
  return Math.abs(Math.round(diffMs / 60000));
};

export default function OrderItem({ item }: Props) {
  return (
    <View style={styles.mainView}>
      <View style={styles.view}>
        <Text style={styles.orderNo}>Order No.{item.id}</Text>
        <Text
          style={[
            styles.status,
            {
              backgroundColor: item.status === 0 ? "red" : "green",
            },
          ]}
        >
          {item.status === 0 ? "Preparing" : "Delivered"}
        </Text>
      </View>
      {item.actualDelivery === null && (
        <View style={styles.view}>
          <Text style={styles.time}>
            Delivery on: {Dateformat(item.estimatedDelivery)}
          </Text>
          <Text style={styles.delivery}>
            Only {calcMin(item.estimatedDelivery)} minutes left 😃
          </Text>
        </View>
      )}
      <View style={styles.viewPrice}>
        <Text style={styles.priceTint}>Order Price: </Text>
        <Text style={styles.price}>${item.orderPrice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#ddd",
    padding: 10,
  },
  view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderNo: {
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    borderRadius: 12,
    color: "#fff",
    fontWeight: "600",
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  time: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  delivery: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  viewPrice: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginRight: 10,
  },
  priceTint: { fontSize: 16, fontWeight: "600" },
  price: { fontSize: 16 },
});
