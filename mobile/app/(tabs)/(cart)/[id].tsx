import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../../components/menu/menuSlice";
import { AppDispatch, IState } from "../../../store/store";
import Error from "../../../ui/Error";
import { AddItem, ICart } from "../../../components/cart/cartSlice";
import ButtonOptions from "../../../ui/ButtonOptions";
import Loader from "../../../ui/Loader";

export default function CartId() {
  const { item, loader, error } = useSelector((store: IState) => store.menu);
  const { cart } = useSelector((store: IState) => store.cart);

  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchItem(String(id)));
  }, [id]);
  if (loader) return <Loader />;
  if (error) return <Error error={error} />;

  const onAdd = (): void => {
    const newItem: ICart = {
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      description: item.description,
      unitPrice: Math.round(item.unitPrice),
      quantity: 1,
      totalPrice: item.unitPrice * 1,
    };
    dispatch(AddItem(newItem));
  };
  const quantity: number | undefined = cart.find(
    (c) => String(c.id) === String(id)
  )?.quantity;
  return (
    <View>
      <Image
        source={{ uri: item.imageUrl }}
        style={{
          height: 400,
          width: "100%",
          marginBottom: 25,
          alignSelf: "center",
          objectFit: "cover",
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          marginBottom: 12,
          marginLeft: 20,
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          maxWidth: 300,
          fontWeight: "400",
          marginBottom: 12,
          marginLeft: 20,
          textTransform: "capitalize",
        }}
      >
        {item.description}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          ${item.unitPrice}
        </Text>
        {quantity ? (
          <ButtonOptions quantity={quantity} id={item.id} />
        ) : (
          <Pressable
            style={{
              backgroundColor: "rgb(19 28 36)",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 50,
            }}
            onPress={onAdd}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Add Item
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
