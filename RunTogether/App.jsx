import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomePage from './screens/HomePage';
import SignUpScreen from './screens/SignUpScreen';
import CreatePost from './screens/CreatePost';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home Page"
          component={HomePage}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUpScreen}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="Create Post"
          component={CreatePost}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="Profile Details"
          component={ProfileScreen}
          options={{ headerTitle: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}