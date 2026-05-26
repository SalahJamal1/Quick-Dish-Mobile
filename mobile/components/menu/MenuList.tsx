import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { IItem } from "./menuSlice";
import MenuItem from "./MenuItem";
import { useRouter } from "expo-router";

type Props = {
  menu: IItem[];
  item: string;
};

export default function MenuList({ menu, item }: Props) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={menu ? menu : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                router.push(
                  `(cart)/${item.id}?title=${encodeURIComponent(item.name)}`,
                )
              }
              style={styles.pressableItem}
            >
              <MenuItem item={item} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 15,
    color: "#0F172A",
    marginLeft: 20,
  },
  horizontalList: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  pressableItem: {
    marginRight: 15,
  },
});
