import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Dimensions } from "react-native";

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

export const isConnected = async () => {
  const connectionStatus = await NetInfo.fetch();
  return connectionStatus.isConnected;
};
