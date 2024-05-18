import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import avatarImage from "../assets/avatar.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../backend/api/client.js";

const PostDetails = ({ route, navigation }) => {
  const { post } = route.params;
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState({});

  const fetchUserData = async (userId) => {
    try {
      const response = await client.get(`/user/${userId}`);
      const userData = response.data;
      setUsers((prevUsers) => ({ ...prevUsers, [userId]: userData }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const renderComment = ({ item }) => {
    const userId = item.user;
    const user = users[userId];

    if (!user) {
      fetchUserData(userId);
      return (
        <View style={styles.commentContainer}>
          <Image
            source={require("../assets/avatar.jpg")}
            style={styles.commentProfilePic}
          />
          <View style={styles.commentTextContainer}>
            <Text style={styles.commentAuthor}>Loading...</Text>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.commentContainer}>
        <Image source={{ uri: user.image }} style={styles.commentProfilePic} />
        <View style={styles.commentTextContainer}>
          <Text style={styles.commentAuthor}>{user.username}</Text>
          <Text style={styles.commentText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const handleCommentChange = (text) => {
    setNewComment(text);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await client.put(
          `/post/${post._id}/comment`,
          { text: newComment.trim() },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedPost = response.data;
        navigation.setParams({ post: updatedPost });
        setNewComment("");
        Keyboard.dismiss(); // Dismiss the keyboard after sending the comment
      } catch (error) {
        console.error("Error commenting on post:", error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 54 : 0}
      >
        <View style={styles.container}>
          <FlatList
            data={[post]} // Pass post as an array with a single item
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <>
                <View style={styles.userContainer}>
                  {item.userProfilePic ? (
                    <Image
                      source={{ uri: item.userProfilePic }}
                      style={styles.profilePic}
                    />
                  ) : (
                    <Image source={avatarImage} style={styles.profilePic} />
                  )}
                  <Text style={styles.userName}>{item.username}</Text>
                  <Text style={styles.postDate}>{item.postDate}</Text>
                </View>
                <Text style={styles.postDescription}>{item.description}</Text>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.postImage}
                  />
                )}
                {item.location && (
                  <View style={styles.locationContainer}>
                    {item.location && (
                      <Text style={styles.locationText}>{item.location}</Text>
                    )}
                  </View>
                )}
                {item.likes && (
                  <Text style={styles.likeCount}>
                    {item.likes.length} Like{item.likes.length !== 1 ? "s" : ""}
                  </Text>
                )}
                <FlatList
                  data={item.comments}
                  renderItem={renderComment}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.commentsContainer}
                />
              </>
            )}
          />
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor={"black"}
              value={newComment}
              onChangeText={handleCommentChange}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleCommentSubmit}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#c1c1c2",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
    color: "#333",
  },
  postDate: {
    fontSize: 12,
    color: "#666",
  },
  postDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationContainer: {
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
  },
  likeCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  commentsContainer: {
    marginTop: 20,
    maxHeight: 350,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  commentProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentTextContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    // flex: 1,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "rgb(247,112,110)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PostDetails;
