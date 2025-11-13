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
    <View
      style={{
        marginBottom: 20,
      }}
    >
      <Text style={styles.title}>{item}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={menu ? menu : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                router.push(
                  `(cart)/${item.id}?title=${encodeURIComponent(item.name)}`
                )
              }
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
  title: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 20,
    alignSelf: "flex-start",
    color: "rgb(19 28 36)",
    marginLeft: 20,
  },
});
