import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUser } from "../../api/ApiAuth";
import { User_Load } from "./userSlice";
import Loader from "../../ui/Loader";

export default function UserLoader() {
  const dispatch = useDispatch<AppDispatch>();
  const [initialized, setInitialized] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        if (token) {
          const res = await ApiUser();
          dispatch(User_Load(res.data));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setInitialized(true);
      }
    })();
  }, []);

  if (!initialized) return <Loader />;
  return null;
}
