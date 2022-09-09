import AsyncStorage from "@react-native-async-storage/async-storage";
import { isString } from "lodash";

const User = "User";

export const persistUser = (userId) => {
  AsyncStorage.setItem(User, JSON.stringify(userId));
};

export const rehydrateUser = async () => {
  const asyncUser = await AsyncStorage.getItem(User);
  if (asyncUser && isString(asyncUser)) {
    const userObject = JSON.parse(asyncUser);
    return userObject;
  }
  return "";
};
