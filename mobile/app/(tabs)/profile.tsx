import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IState } from "../../store/store";
import { ApiLogout } from "../../api/ApiAuth";
import { User_Logout } from "../../components/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemView from "../../ui/ThemView";
import Feather from "@expo/vector-icons/Feather";

export default function Profile() {
  const { Auth, user } = useSelector((store: IState) => store.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const res = await ApiLogout();
      dispatch(User_Logout());
      AsyncStorage.removeItem("jwt");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const userInitials = Auth && user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ""}`.toUpperCase()
    : "G";

  return (
    <ThemView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {/* User Greeting Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userInitials}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {Auth ? `${user?.firstName} ${user?.lastName || ""}` : "Guest Account"}
            </Text>
            <Text style={styles.userSub}>
              {Auth ? user?.email : "Login to order & track deliveries"}
            </Text>
          </View>
        </View>

        {/* User Info Fields (Only if Auth) */}
        {Auth && (
          <View style={styles.infoDetailsCard}>
            <Text style={styles.detailsHeading}>My Information</Text>

            <View style={styles.detailRow}>
              <Feather name="phone" size={15} color="#64748B" style={styles.detailIcon} />
              <Text style={styles.detailText}>{user?.phoneNumber || "No phone added"}</Text>
            </View>

            <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
              <Feather name="map-pin" size={15} color="#64748B" style={styles.detailIcon} />
              <Text style={styles.detailText} numberOfLines={2}>
                {user?.Address || "No address added"}
              </Text>
            </View>
          </View>
        )}

        {/* Dynamic Action Settings Sheet */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuHeading}>Account Settings</Text>

          {Auth ? (
            <>
              {/* Orders settings row */}
              <Pressable style={styles.menuRow} onPress={() => router.push("orders")}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconContainer, { backgroundColor: "#E0F2FE" }]}>
                    <Feather name="package" size={15} color="#0284C7" />
                  </View>
                  <Text style={styles.menuLabel}>Your Orders</Text>
                </View>
                <Feather name="chevron-right" size={16} color="#94A3B8" />
              </Pressable>

              {/* Address settings row */}
              <Pressable style={styles.menuRow} onPress={() => alert("Address settings coming soon!")}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconContainer, { backgroundColor: "#F0FDF4" }]}>
                    <Feather name="map-pin" size={15} color="#16A34A" />
                  </View>
                  <Text style={styles.menuLabel}>Delivery Addresses</Text>
                </View>
                <Feather name="chevron-right" size={16} color="#94A3B8" />
              </Pressable>

              {/* Payment Settings row */}
              <Pressable style={styles.menuRow} onPress={() => alert("Payment methods coming soon!")}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconContainer, { backgroundColor: "#FDF4FF" }]}>
                    <Feather name="credit-card" size={15} color="#C084FC" />
                  </View>
                  <Text style={styles.menuLabel}>Payment Options</Text>
                </View>
                <Feather name="chevron-right" size={16} color="#94A3B8" />
              </Pressable>
            </>
          ) : (
            <>
              {/* Sign In row */}
              <Pressable style={styles.menuRow} onPress={() => router.push("login")}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconContainer, { backgroundColor: "#FFEBE7" }]}>
                    <Feather name="log-in" size={15} color="#FF5A36" />
                  </View>
                  <Text style={styles.menuLabel}>Sign In</Text>
                </View>
                <Feather name="chevron-right" size={16} color="#94A3B8" />
              </Pressable>

              {/* Register Account row */}
              <Pressable style={styles.menuRow} onPress={() => router.push("signup")}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconContainer, { backgroundColor: "#F1F5F9" }]}>
                    <Feather name="user-plus" size={15} color="#475569" />
                  </View>
                  <Text style={styles.menuLabel}>Create Account</Text>
                </View>
                <Feather name="chevron-right" size={16} color="#94A3B8" />
              </Pressable>
            </>
          )}

          {/* Support row */}
          <Pressable style={styles.menuRow} onPress={() => alert("Support channels coming soon!")}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconContainer, { backgroundColor: "#FFF7ED" }]}>
                <Feather name="help-circle" size={15} color="#EA580C" />
              </View>
              <Text style={styles.menuLabel}>Help & Support</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#94A3B8" />
          </Pressable>

          {/* Log out row */}
          {Auth && (
            <Pressable style={[styles.menuRow, { borderBottomWidth: 0 }]} onPress={onSubmit}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: "#FEF2F2" }]}>
                  <Feather name="log-out" size={15} color="#EF4444" />
                </View>
                <Text style={[styles.menuLabel, { color: "#EF4444", fontWeight: "700" }]}>Logout</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#EF4444" />
            </Pressable>
          )}
        </View>
      </ScrollView>
    </ThemView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFEBE7",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF5A36",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FF5A36",
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  userSub: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  infoDetailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  detailsHeading: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
    textTransform: "uppercase",
    letterSpacing: 1.0,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  detailIcon: {
    marginRight: 12,
  },
  detailText: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "500",
    flex: 1,
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  menuHeading: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
    textTransform: "uppercase",
    letterSpacing: 1.0,
    marginBottom: 14,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
});
