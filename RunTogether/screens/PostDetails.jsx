import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
      } catch (error) {
        console.error("Error commenting on post:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.userContainer}>
          {post.userProfilePic ? (
            <Image
              source={{ uri: post.userProfilePic }}
              style={styles.profilePic}
            />
          ) : (
            <Image source={avatarImage} style={styles.profilePic} />
          )}
          <Text style={styles.userName}>{post.username}</Text>
          <Text style={styles.postDate}>{post.postDate}</Text>
        </View>
        <Text style={styles.postDescription}>{post.description}</Text>
        {post.image && (
          <Image source={{ uri: post.image }} style={styles.postImage} />
        )}
        {post.location && (
          <View style={styles.locationContainer}>
            {post.location && (
              <Text style={styles.locationText}>{post.location}</Text>
            )}
          </View>
        )}
        {post.likes && (
          <Text style={styles.likeCount}>
            {post.likes.length} Like{post.likes.length !== 1 ? "s" : ""}
          </Text>
        )}
        <FlatList
          data={post.comments}
          renderItem={renderComment}
          keyExtractor={(item, index) => index.toString()}
          style={styles.commentsContainer}
        />
      </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  innerContainer: {
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
    paddingHorizontal: 15,
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
