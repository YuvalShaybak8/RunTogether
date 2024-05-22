import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MyPostsScreenService } from "../../services/myPostsScreen.service.js";
import PostActions from "./PostActions.js";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import client from "../../backend/api/client.js";
import { uploadService } from "../../services/upload.service.js";

const Post = ({
  navigation,
  item,
  index,
  posts,
  user,
  profileImage,
  setEditableDescription,
  setEditedDescription,
  editableDescription,
  editedDescription,
  setUser,
}) => {
  const [postImage, setPostImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postImage !== null) {
      handleUpdate();
    }
  }, [postImage]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await client.get("/user/email/" + user.email);
      const existingUser = response.data;
      const base64Img = `data:image/jpg;base64,${await fetch(postImage.uri)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        )}`;
      let imgData = await uploadService.uploadImg(base64Img);
      if (existingUser) {
        const updatedPosts = existingUser.posts.map((post) => {
          if (post._id === item._id) {
            return { ...post, image: imgData.secure_url };
          }
          return post;
        });

        const updatedUser = { ...existingUser, posts: updatedPosts };
        await client.put(`/user/${user._id}`, updatedUser);

        const postResponse = await client.get("/post/" + item._id);
        const currentPost = postResponse.data;
        await client.put(`/post/${item._id}`, {
          ...currentPost,
          image: imgData.secure_url,
        });

        console.log("Success: Post image updated successfully!");
        navigation.navigate("My Posts");
      }
    } catch (error) {
      console.log("Error updating/creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPostImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPostImage({ uri: result.assets[0].uri });
    }
  };

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
        <View>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={handleEditPostImage}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Feather name="edit-3" size={16} color="white" />
            )}
          </TouchableOpacity>
        </View>
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
  editIconContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#F7706EFF",
    borderRadius: 20,
    padding: 8,
  },
});

export default Post;
