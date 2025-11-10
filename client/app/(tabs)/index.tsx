import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IState } from "../../store/store";
import { fetchMenu } from "../../components/menu/menuSlice";
import MenuList from "../../components/menu/MenuList";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";

export default function Home() {
  const catagory: string[] = ["shawerma", "pizza", "burger"];
  const { menu, loader, error } = useSelector((store: IState) => store.menu);
  const { cart } = useSelector((store: IState) => store.cart);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMenu());
  }, []);
  const menuFilter = (catagory: string) =>
    (menu ? menu : []).filter((item) => item.catagory === catagory);

  if (loader) return <Loader />;
  if (error) return <Error error={error} />;
  return (
    <FlatList
      style={{
        paddingVertical: 10,
        marginTop: 50,
      }}
      data={catagory}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <MenuList item={item} menu={menuFilter(item)} key={item} />
      )}
    />
  );
}
