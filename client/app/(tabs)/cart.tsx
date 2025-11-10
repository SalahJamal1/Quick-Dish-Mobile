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
        <Text style={styles.title}>
          Your Cart {Auth && user?.firstName?.toLocaleUpperCase()}
        </Text>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <CartItem item={item} />;
          }}
        />
        <View style={styles.mainView}>
          <View style={styles.viewInfo}>
            <Text style={styles.text}>Basket total :</Text>
            <Text style={styles.price}>${totalPrice}</Text>
          </View>
          <View style={styles.viewInfo}>
            <Text style={styles.text}>Delivery Fees :</Text>
            <Text style={styles.price}>${Fees}</Text>
          </View>
          <View style={styles.viewInfo}>
            <Text style={styles.text}>Order Total :</Text>
            <Text style={styles.price}>${orderPrice}</Text>
          </View>
        </View>
      </ThemView>
      <Pressable
        style={styles.btn}
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
          {loader ? "Loading..." : Auth ? "Order Now" : "Login"}
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    borderBottomWidth: 1,
    borderColor: "rgb(19 28 36)",
    alignSelf: "flex-start",
    paddingBottom: 3,
    fontSize: 18,
    color: "rgb(19 28 36)",
    marginBottom: 20,
  },
  mainView: {
    backgroundColor: "#ddd",
    marginHorizontal: 20,
    paddingVertical: 15,
  },
  viewInfo: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: "space-between",
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "rgb(19 28 36)",
    paddingVertical: 15,
    paddingHorizontal: 10,
    height: 70,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
