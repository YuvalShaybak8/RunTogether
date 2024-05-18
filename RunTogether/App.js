import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginSignupService from "./services/loginSignup.service"; // import your loginSignup service

import LoginScreen from "./screens/LoginScreen";
import HomePage from "./screens/HomePage";
import SignUpScreen from "./screens/SignUpScreen";
import CreatePost from "./screens/CreatePost";
import ProfileScreen from "./screens/ProfileScreen";
import MyPostsScreen from "./screens/MyPostsScreen";
import PostDetails from "./screens/PostDetails";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      const loggedIn = await loginSignupService.isLoggedIn();
      setUserToken(loggedIn);
      setLoading(false);
    };

    checkUserToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#F7706EFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
