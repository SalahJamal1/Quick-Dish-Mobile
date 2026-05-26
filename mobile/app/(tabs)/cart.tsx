import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IState } from "../../store/store";
import CartItem from "../../components/cart/CartItem";
import ThemView from "../../ui/ThemView";
import { useRouter } from "expo-router";
import CartEmpty from "../../components/cart/CartEmpty";
import { ApiOrders } from "../../api/ApiOrder";
import axios from "axios";
import Toast from "react-native-toast-message";
import { ClearItem } from "../../components/cart/cartSlice";
import BackButton from "../../ui/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((store: IState) => store.cart);
  const { user, Auth } = useSelector((store: IState) => store.user);
  const totalPrice: number = Number(
    cart.reduce((a, b) => a + b.totalPrice, 0).toFixed(2)
  );
  const Fees: number = +(totalPrice * 0.2).toFixed(2);
  const orderPrice: number = +(totalPrice + Fees).toFixed(2);
  if (!cart.length) return <CartEmpty />;

  const onSubmit = async () => {
    const cartOrder = cart.map((c) => {
      return {
        quantity: c.quantity,
        totalPrice: c.totalPrice,
        itemId: c.id,
      };
    });

    const newOrder = {
      carts: cartOrder,
      orderPrice,
    };
    setLoader(true);
    try {
      const res = await ApiOrders(newOrder);
      Toast.show({
        type: "success",
        topOffset: 100,
        text1: "You have ordered successfully",
      });
      dispatch(ClearItem());

      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response)
        Toast.show({
          type: "error",
          topOffset: 100,
          text1: err?.response?.data ?? "Something went wrong",
        });
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <ThemView>
        <BackButton />
        <View style={styles.header}>
          <Text style={styles.title}>My Basket</Text>
          {Auth && user?.firstName && (
            <Text style={styles.subtitle}>Let's checkout, {user.firstName}! 👋</Text>
          )}
        </View>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CartItem item={item} />;
          }}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.mainView}>
          <View style={styles.viewInfo}>
            <Text style={styles.text}>Basket total</Text>
            <Text style={styles.price}>${totalPrice}</Text>
          </View>
          <View style={styles.viewInfo}>
            <Text style={styles.text}>Delivery Fees</Text>
            <Text style={styles.price}>${Fees}</Text>
          </View>
          <View style={[styles.viewInfo, styles.totalRow]}>
            <Text style={styles.totalText}>Order Total</Text>
            <Text style={styles.totalPrice}>${orderPrice}</Text>
          </View>
        </View>
      </ThemView>
      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.btn, loader && styles.btnDisabled]}
          disabled={loader}
          onPress={() => {
            if (!Auth) {
              router.push("login");
            } else {
              onSubmit();
            }
          }}
        >
          <Text style={styles.btnText}>
            {loader ? "Processing..." : Auth ? `Order Now • $${orderPrice}` : "Login to Checkout"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 15,
  },
  mainView: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  viewInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    marginTop: 8,
    paddingTop: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  totalText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FF5A36",
  },
  bottomBar: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
  },
  btn: {
    backgroundColor: "#FF5A36",
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5A36",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  btnDisabled: {
    backgroundColor: "#CBD5E1",
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});
