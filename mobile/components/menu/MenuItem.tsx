import React, { useEffect } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";
import { IItem } from "./menuSlice";
import { useSelector } from "react-redux";
import { IState } from "../../store/store";
import ButtonOptions from "../../ui/ButtonOptions";
import ImageAnimated from "../../ui/ImageAnimated";

type Props = {
  item: IItem;
};

export default function MenuItem({ item }: Props) {
  const { cart } = useSelector((store: IState) => store.cart);
  const currentQuantity = cart.find((c) => c.id === item.id)?.quantity;

  const anim = useAnimatedValue(0);
  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const blur = anim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });
  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <ImageAnimated uri={item.imageUrl} image={styles.img} />
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#22212118",
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
