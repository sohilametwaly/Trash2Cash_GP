import * as secureStore from "expo-secure-store";

export const saveToken = async (token) => {
  await secureStore.setItemAsync("token", token);
};

export const getToken = async () => {
  return await secureStore.getItemAsync("token");
};

export const removeToken = async () => {
  await secureStore.deleteItemAsync("token");
};
