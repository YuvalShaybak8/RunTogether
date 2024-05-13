import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { MyPostsScreenService } from "../../services/myPostsScreen.service";
import PostActions from "./PostActions";
import likeIcon from "../../assets/like.png";
import LikesAndComments from "../LikesAndComments";

const Post = ({
  item,
  index,
  posts,
  user,
  profileImage,
  handleEditDescription,
  handleDeleteDescription,
  handleSaveDescription,
  setEditableDescription,
  setEditedDescription,
  editableDescription,
  editedDescription,
  setUser,
}) => {
  useEffect(() => {
    console.log("Post rendered", [item.description]);
  }, [item.description]);

  const isLastItem = index === posts.length - 1;
  return (
    <View
      style={[styles.postContainer, isLastItem && styles.postContainerLast]}
    >
      <View style={styles.userContainer}>
        <Image
          source={profileImage || require("../../assets/avatar.jpg")}
          style={styles.profilePic}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.postDate}>
            {MyPostsScreenService.formatPostDate(item.createdAt)}
          </Text>
        </View>
        <PostActions
          item={item}
          handleEditDescription={() =>
            MyPostsScreenService.handleEditDescription(
              item._id,
              item.description,
              setEditableDescription,
              setEditedDescription
            )
          }
          handleSaveDescription={() =>
            MyPostsScreenService.handleSaveDescription(
              item._id,
              editedDescription,
              setEditableDescription,
              user,
              setUser
            )
          }
          handleDeletePost={() =>
            MyPostsScreenService.handleDeletePost(item._id, user, setUser)
          }
          editableDescription={editableDescription}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
        />
      </View>
      {editableDescription === item._id ? (
        <TextInput
          style={styles.editableDescription}
          value={editedDescription}
          onChangeText={(text) => setEditedDescription(text)}
        />
      ) : (
        <Text style={styles.postDescription}>{item.description}</Text>
      )}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      {item.location && (
        <View style={styles.locationContainer}>
          <Image
            source={require("../../assets/placeholder.png")}
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      )}
      <LikesAndComments item={item} />
      {/* <View style={styles.likesAndComments}>
        <View style={styles.likesContainer}>
          <Image source={likeIcon} style={[styles.likeIcon]} />
          <Text style={[styles.likeCount]}>
            {item.likes.length} Like{item.likes.length !== 1 ? "s" : ""}
          </Text>
        </View>
        <View style={styles.commentsContainer}>
          <Text style={styles.commentCount}>
            {item.comments.length} comment
            {item.comments.length !== 1 ? "s" : ""}
          </Text>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
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
    marginBottom: 80,
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
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 8,
    color: "#333",
  },
  postDate: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: 8,
  },
  postDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
  },
  editableDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
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

export default Post;
