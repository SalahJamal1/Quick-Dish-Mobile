import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../../components/menu/menuSlice";
import { AppDispatch, IState } from "../../../store/store";
import Error from "../../../ui/Error";
import { AddItem, ICart } from "../../../components/cart/cartSlice";
import ButtonOptions from "../../../ui/ButtonOptions";
import Loader from "../../../ui/Loader";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CartId() {
  const { item, loader, error } = useSelector((store: IState) => store.menu);
  const { cart } = useSelector((store: IState) => store.cart);
  const router = useRouter();

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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Immersive Image Header */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.heroImg}
            resizeMode="cover"
          />
          {/* Floating Back Button */}
          <Pressable style={styles.floatingBack} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </Pressable>
        </View>

        {/* Details Container */}
        <View style={styles.detailsContainer}>
          {/* Tags Row */}
          <View style={styles.tagsRow}>
            <View style={[styles.tag, styles.tagPrimary]}>
              <Text style={styles.tagTextPrimary}>Best Seller 🔥</Text>
            </View>
            <View style={[styles.tag, styles.tagSecondary]}>
              <Text style={styles.tagTextSecondary}>Free Delivery 🛵</Text>
            </View>
          </View>

          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Unit Price</Text>
          <Text style={styles.priceText}>${item.unitPrice}</Text>
        </View>
        <View style={styles.actionContainer}>
          {quantity ? (
            <View style={styles.optionsWrapper}>
              <ButtonOptions quantity={quantity} id={item.id} />
            </View>
          ) : (
            <Pressable style={styles.addBtn} onPress={onAdd}>
              <Text style={styles.addBtnText}>Add to Cart</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingBottom: 110,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 380,
  },
  heroImg: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  floatingBack: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  detailsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  tagsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  tagPrimary: {
    backgroundColor: "#FFEBE7",
  },
  tagSecondary: {
    backgroundColor: "#F1F5F9",
  },
  tagTextPrimary: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF5A36",
  },
  tagTextSecondary: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 20,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 94,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  priceContainer: {
    flexDirection: "column",
  },
  priceLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.0,
    marginBottom: 2,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FF5A36",
  },
  actionContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginLeft: 20,
  },
  optionsWrapper: {
    transform: [{ scale: 1.15 }],
  },
  addBtn: {
    backgroundColor: "#FF5A36",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5A36",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  addBtnText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
