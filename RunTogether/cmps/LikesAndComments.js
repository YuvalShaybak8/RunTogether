import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import likeIcon from "../assets/like.png";
import fullLikeIcon from "../assets/like_full.png";

const LikesAndComments = ({ item, toggleLike, isPostLiked }) => {
  return (
    <View style={styles.likesAndComments}>
      {toggleLike ? (
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
      ) : (
        <View style={styles.likesContainer}>
          <Image source={likeIcon} style={[styles.likeIcon]} />
          <Text style={[styles.likeCount]}>
            {item.likes.length} Like{item.likes.length !== 1 ? "s" : ""}
          </Text>
        </View>
      )}

      <View style={styles.commentsContainer}>
        <Text style={styles.commentCount}>
          {item.comments.length} comment
          {item.comments.length !== 1 ? "s" : ""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  likesAndComments: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeIcon: {
    width: 20,
    height: 20,
    margin: 5,
    tintColor: "#666",
  },
  likeCount: {
    fontSize: 14,
    color: "#666",
  },
  commentsContainer: {},
  commentCount: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
});

export default LikesAndComments;
