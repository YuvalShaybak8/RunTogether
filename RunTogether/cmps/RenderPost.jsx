import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import avatarImage from "../assets/avatar.jpg";
import LikesAndComments from "./LikesAndComments";

const RenderPost = ({
  item,
  isLastItem,
  navigation,
  toggleLike,
  isPostLiked,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostDetails", { post: item })}
      activeOpacity={0.8}
    >
      <View
        style={[styles.postContainer, isLastItem && styles.postContainerLast]}
      >
        <View style={styles.userContainer}>
          <Image
            source={
              item.userProfilePic ? { uri: item.userProfilePic } : avatarImage
            }
            style={styles.profilePic}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.username}</Text>
            <Text style={styles.postDate}>{item.postDate}</Text>
          </View>
        </View>
        <Text style={styles.postDescription}>{item.description}</Text>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.postImage} />
        )}
        {item.location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        )}
        <LikesAndComments
          item={item}
          toggleLike={toggleLike}
          isPostLiked={isPostLiked}
        />
        {/* <View style={styles.likesAndComments}>
          <TouchableOpacity
            onPress={() => toggleLike(item._id)}
            style={styles.likesContainer}
          >
            <Image
              source={isPostLiked(item._id) ? fullLikeIcon : likeIcon}
              style={[
                styles.likeIcon,
                { tintColor: isPostLiked(item._id) ? "#0866ff" : "#666" },
              ]}
            />
            <Text
              style={[
                styles.likeCount,
                { color: isPostLiked(item._id) ? "#0866ff" : "#666" },
              ]}
            >
              {item.likes.length} Like{item.likes.length !== 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
          <View style={styles.commentsContainer}>
            <Text style={styles.commentCount}>
              {item.comments.length} comment
              {item.comments.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postContainerLast: {
    marginBottom: 60,
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
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
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
    marginBottom: 10,
  },
});

export default RenderPost;
