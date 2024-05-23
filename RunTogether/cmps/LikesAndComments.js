import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const LikesAndComments = ({ item, toggleLike, isPostLiked, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.likesContainer}>
        <TouchableOpacity onPress={() => toggleLike(item._id)}>
          <View
            style={
              isPostLiked(item._id)
                ? styles.likeIconWrapper
                : styles.unlikeIconWrapper
            }
          >
            <Icon
              name="thumbs-up"
              size={20}
              style={
                isPostLiked(item._id) ? styles.likeIcon : styles.unlikeIcon
              }
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.likeText}>{item.likes.length}</Text>
      </View>
      <View style={styles.commentsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PostDetails", { post: item })}
        >
          <Icon
            name="comment"
            size={20}
            color="gray"
            style={styles.commentIcon}
          />
        </TouchableOpacity>
        <Text style={styles.commentText}>{item.comments.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeIconWrapper: {
    marginRight: 5,
    backgroundColor: "#1a7efe",
    padding: 5,
    borderRadius: 10,
  },
  unlikeIconWrapper: {
    marginRight: 5,
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 10,
  },
  likeIcon: {
    color: "white",
  },
  unlikeIcon: {
    color: "gray",
  },
  likeText: {
    fontSize: 14,
  },
  commentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentIcon: {
    marginRight: 5,
  },
  commentText: {
    fontSize: 14,
  },
});

export default LikesAndComments;
