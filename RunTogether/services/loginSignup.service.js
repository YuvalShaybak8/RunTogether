import client from "../backend/api/client.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = async (email, password) => {
  try {
    const response = await client.post("/user/login", { email, password });
    const { token, user } = response.data;
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("loggedInUserID", user._id);
    return { token, user };
  } catch (error) {
    throw error;
  }
};

const signup = async (email, password) => {
  // Implement signup logic similar to login if needed
  // const response = await client.post('/user/signup', { email, password });
  // return response.data;
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("loggedInUserID");
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  signup,
  logout,
};
