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

const signup = async (username, email, password) => {
  console.log("Signing up:", email, password);
  try {
    const response = await client.post("/user", {
      username,
      email,
      password,
    });
    const { token, user } = response.data;
    console.log(
      "Signed up successfully:",
      user.username,
      user.email,
      user._id,
      token
    );
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("loggedInUserID", user._id);
    return { success: true };
  } catch (error) {
    console.error("Error signing up:", error.message);
    return { success: false, error: error.message };
  }
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
