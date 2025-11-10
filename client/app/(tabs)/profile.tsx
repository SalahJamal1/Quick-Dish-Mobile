import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IState } from "../../store/store";
import { ApiLogout } from "../../api/ApiAuth";
import { User_Logout } from "../../components/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { Auth, user } = useSelector((store: IState) => store.user);
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async () => {
    try {
      const res = await ApiLogout();
      dispatch(User_Logout());
      AsyncStorage.removeItem("jwt");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.heading}>
        <View style={styles.viewImg}>
          <Text style={styles.title}>
            Hey {Auth ? user?.firstName?.toUpperCase() : "There"} !
          </Text>
          <Image
            source={require("../../assets/Burgermeister-Chili-Cheeseburger-1.png")}
            style={styles.img}
          />
        </View>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure rerum
          et eligendi voluptates quibusdam quis harum aliquid cum repellendus
          nemo molestias dolore earum ut non, dolor magni blanditiis assumenda
          ex.
        </Text>
      </View>
      {Auth && (
        <Link href="orders" style={styles.link}>
          Your Order
        </Link>
      )}
      <>
        {Auth ? (
          <Pressable
            style={{
              backgroundColor: "rgb(19 28 36)",
              alignSelf: "flex-start",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 7,
              marginLeft: 10,
            }}
            onPress={onSubmit}
          >
            <Text style={styles.logout}>Logout</Text>
          </Pressable>
        ) : (
          <>
            <Link href="login" style={styles.link}>
              Login
            </Link>
            <Link href="signup" style={styles.link}>
              Create Account
            </Link>
          </>
        )}
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 7,
    marginBottom: 50,
  },
  view: {
    marginTop: 30,
    flex: 1,
    marginHorizontal: 20,
  },
  viewImg: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 3,
  },
  logout: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  link: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 30,
  },
  img: {
    height: 50,
    width: 50,
    marginLeft: 50,
  },
});
