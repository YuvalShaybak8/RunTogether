import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from "react-native";
import BottomNavigation from "../cmps/BottomNavigation";
import HeaderComponent from "../cmps/HeaderComponent";
import RenderPost from "../cmps/RenderPost";
import avatarImage from "../assets/avatar.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../backend/api/client.js";

const HomePage = ({ navigation, handlePressOutsideMenu }) => {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loggedInUserID, setLoggedInUserID] = useState(null);
  const [loggedInUserProfilePic, setLoggedInUserProfilePic] =
    useState(avatarImage);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    fetchData();
    fetchLoggedInUserProfilePic();
    getLikedPosts();
  }, [loggedInUserID, isRefreshing, loggedInUserProfilePic]);

  const fetchData = async () => {
    try {
      const postsResponse = await client.get("/post");
      let posts = postsResponse.data;

      // Sort posts by post date in descending order
      posts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const postsWithUserData = await Promise.all(
        posts.map(async (post) => {
          try {
            const userResponse = await client.get(`/user/${post.user}`);
            const userData = userResponse.data;
            const postDate = new Date(userData.createdAt).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }
            );
            return {
              ...post,
              userProfilePic: userData.image,
              username: userData.username,
              postDate,
            };
          } catch (error) {
            console.error("Error fetching user data:", error);
            return {
              ...post,
              userProfilePic: null,
              username: "Unknown",
              postDate: "",
            };
          }
        })
      );
      setPosts(postsWithUserData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchLoggedInUserProfilePic = async () => {
    try {
      const currentLoggedInUserID = await AsyncStorage.getItem(
        "loggedInUserID"
      );
      setLoggedInUserID(currentLoggedInUserID);
      const userResponse = await client.get(`/user/${currentLoggedInUserID}`);
      const { data } = userResponse;
      const userProfilePic = data.image;
      setLoggedInUserProfilePic(userProfilePic);
      return userProfilePic;
    } catch (error) {
      console.error("Error fetching logged in user profile picture:", error);
      setLoggedInUserProfilePic(null);
    }
  };

  const getLikedPosts = async () => {
    const likedPostsIDs = [];
    posts.forEach((post) => {
      if (post.likes.includes(loggedInUserID)) {
        likedPostsIDs.push(post._id);
      }
    });
    setLikedPosts(likedPostsIDs);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  };

  const toggleLike = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await client.put(`/post/${postId}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedPost = response.data;
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id
          ? { ...post, likes: updatedPost.likes }
          : post
      );
      setPosts(updatedPosts);
      updateLikedPosts(updatedPost._id);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const updateLikedPosts = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const isPostLiked = (postId) => {
    return likedPosts.includes(postId);
  };

  const renderPost = ({ item, index }) => {
    const isLastItem = index === posts.length - 1;
    return (
      <RenderPost
        item={item}
        isLastItem={isLastItem}
        navigation={navigation}
        toggleLike={toggleLike}
        isPostLiked={isPostLiked}
      />
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <HeaderComponent
          loggedInUserProfilePic={loggedInUserProfilePic}
          navigation={navigation}
        />
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          onScroll={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            if (offsetY <= 0) {
              handleRefresh();
            }
          }}
        />
        <BottomNavigation />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});

export default HomePage;
