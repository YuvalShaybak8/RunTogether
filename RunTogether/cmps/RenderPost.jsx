import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import likeIcon from "../assets/like.png";
import fullLikeIcon from "../assets/like_full.png";
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
          <Image source={{ uri: item.image }} style={styles.postImage} />
        )}
        {item.location && (
          <View style={styles.locationContainer}>
            {item.location && (
              <Text style={styles.locationText}>{item.location}</Text>
            )}
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
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 8,
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
  likeCount: {
    fontSize: 14,
    color: "#666",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsContainer: {},
  commentCount: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  likesAndComments: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeIcon: {
    width: 20,
    height: 20,
    margin: 5,
    tintColor: "#666",
  },
});

export default RenderPost;
