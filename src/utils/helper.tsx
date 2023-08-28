import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import { useStore } from "@zustand/store";

dayjs.extend(relativeTime);
dayjs.locale("ar");

export const { width, height } = Dimensions.get("window");

export const getDataFromStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeDataToStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const deleteStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const rtlWebview = (html: string) => {
  return `<html dir="rtl" lang="ar"><body>${html}</body></html>`;
};

export const dateFromNow = (date: Date) => {
  return dayjs(date).fromNow();
};

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const getTheme = async () => {
  try {
    const darkMode = await getDataFromStorage("isDark");
    if (darkMode === null) {
      useStore.setState({ isDark: false });
    } else {
      useStore.setState({ isDark: darkMode });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserFromStorage = async () => {
  try {
    const user = await getDataFromStorage("user");
    if (user) useStore.setState({ user });
  } catch (error) {
    console.log(error);
  }
};
