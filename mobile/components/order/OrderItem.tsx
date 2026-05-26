import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IOrder } from "../user/userSlice";

type Props = {
  item: IOrder;
};

const Dateformat = (date: string): string => {
  try {
    return new Intl.DateTimeFormat("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  } catch (e) {
    return "";
  }
};

const calcMin = (date: string): number => {
  const diffMs = new Date(date).getTime() - new Date().getTime();
  return Math.max(0, Math.round(diffMs / 60000));
};

export default function OrderItem({ item }: Props) {
  const isPreparing = item.status === 0;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.orderNo}>Order #{item.id}</Text>
        <View
          style={[
            styles.badge,
            isPreparing ? styles.badgePreparing : styles.badgeDelivered,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isPreparing ? styles.statusPreparing : styles.statusDelivered,
            ]}
          >
            {isPreparing ? "Preparing" : "Delivered"}
          </Text>
        </View>
      </View>

      {item.actualDelivery === null && (
        <View style={styles.trackerBox}>
          <View style={styles.trackerRow}>
            <Text style={styles.timeLabel}>Delivery Time</Text>
            <Text style={styles.timeValue}>{Dateformat(item.estimatedDelivery)}</Text>
          </View>
          <View style={[styles.trackerRow, { marginTop: 6 }]}>
            <Text style={styles.deliveryLabel}>
              ⚡ Arriving in {calcMin(item.estimatedDelivery)} mins
            </Text>
          </View>
        </View>
      )}

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Order Total</Text>
        <Text style={styles.priceText}>${item.orderPrice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  orderNo: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgePreparing: {
    backgroundColor: "#FFF7ED",
  },
  badgeDelivered: {
    backgroundColor: "#ECFDF5",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  statusPreparing: {
    color: "#EA580C",
  },
  statusDelivered: {
    color: "#10B981",
  },
  trackerBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  trackerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  timeValue: {
    fontSize: 13,
    color: "#0F172A",
    fontWeight: "700",
  },
  deliveryLabel: {
    fontSize: 13,
    color: "#FF5A36",
    fontWeight: "700",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FF5A36",
  },
});
