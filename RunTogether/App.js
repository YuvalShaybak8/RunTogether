import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomePage from "./screens/HomePage";
import SignUpScreen from "./screens/SignUpScreen";
import CreatePost from "./screens/CreatePost";
import ProfileScreen from "./screens/ProfileScreen";
import MyPostsScreen from "./screens/MyPostsScreen";
import PostDetails from "./screens/PostDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInUserID = await AsyncStorage.getItem("loggedInUserID");
      console.log("loggedInUserID:", loggedInUserID);
      if (loggedInUserID) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  console.log("isLoggedIn:", isLoggedIn);
  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home Page" : "Login"}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUpScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="Home Page"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Post"
          component={CreatePost}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="Profile Details"
          component={ProfileScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="My Posts"
          component={MyPostsScreen}
          options={{ headerTitle: "My Posts" }}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ headerTitle: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
