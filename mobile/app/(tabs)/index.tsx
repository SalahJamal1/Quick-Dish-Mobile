import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IState } from "../../store/store";
import { fetchMenu } from "../../components/menu/menuSlice";
import MenuList from "../../components/menu/MenuList";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import ThemView from "../../ui/ThemView";

export default function Home() {
  const categories: string[] = ["shawerma", "pizza", "burger"];
  const categoryEmojis: Record<string, string> = {
    shawerma: "🌯",
    pizza: "🍕",
    burger: "🍔",
  };
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { menu, loader, error } = useSelector((store: IState) => store.menu);
  const { user, Auth } = useSelector((store: IState) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  const menuFilter = (catagory: string) =>
    (menu ? menu : []).filter((item) => item.catagory === catagory);

  if (loader) return <Loader />;
  if (error) return <Error error={error} />;

  const filteredCategories = selectedCategory ? [selectedCategory] : categories;

  return (
    <ThemView>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* Top Greeting */}
            <View style={styles.greetingRow}>
              <View>
                <Text style={styles.appName}>Quick Dish</Text>
                <Text style={styles.greetingText}>
                  {Auth && user?.firstName
                    ? `Hey ${user.firstName}! 👋`
                    : "Welcome! 👋"}
                </Text>
              </View>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>
                  {Auth && user?.firstName
                    ? user.firstName[0].toUpperCase()
                    : "Q"}
                </Text>
              </View>
            </View>

            {/* Premium Banner Card */}
            <View style={styles.promoBanner}>
              <Text style={styles.promoTitle}>
                Craving Something Delicious?
              </Text>
              <Text style={styles.promoSubtitle}>
                Get your favorite meals delivered hot & fresh! ⚡
              </Text>
            </View>

            {/* Category Pills Selector */}
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionHeading}>Categories</Text>
              {selectedCategory && (
                <Pressable onPress={() => setSelectedCategory(null)}>
                  <Text style={styles.clearFilterText}>Show All</Text>
                </Pressable>
              )}
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <Pressable
                    key={cat}
                    onPress={() => setSelectedCategory(isSelected ? null : cat)}
                    style={[
                      styles.categoryPill,
                      isSelected && styles.categoryPillSelected,
                    ]}
                  >
                    <Text style={styles.categoryEmoji}>
                      {categoryEmojis[cat] || "🍽️"}
                    </Text>
                    <Text
                      style={[
                        styles.categoryLabel,
                        isSelected && styles.categoryLabelSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        }
        data={filteredCategories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <MenuList item={item} menu={menuFilter(item)} key={item} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </ThemView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 10,
  },
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5A36",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFEBE7",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#FF5A36",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF5A36",
  },
  promoBanner: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  promoSubtitle: {
    fontSize: 13,
    color: "#94A3B8",
    lineHeight: 18,
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  clearFilterText: {
    fontSize: 13,
    color: "#FF5A36",
    fontWeight: "600",
  },
  categoriesScroll: {
    paddingBottom: 10,
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  categoryPillSelected: {
    backgroundColor: "#FF5A36",
    borderColor: "#FF5A36",
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    textTransform: "capitalize",
  },
  categoryLabelSelected: {
    color: "#FFFFFF",
  },
});
