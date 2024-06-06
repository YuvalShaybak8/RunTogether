import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import avatarImage from "../assets/avatar.jpg";
import BottomNavigation from "../cmps/BottomNavigation.js";
import Post from "../cmps/MyPostsScreen/Post.js";
import { MyPostsScreenService } from "../services/myPostsScreen.service.js";
import { useNavigation } from "@react-navigation/native";

const MyPostsScreen = () => {
  const [user, setUser] = useState({
    posts: [],
    image: avatarImage,
    username: "",
    email: "",
    password: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
  });
  const [posts, setPosts] = useState([]);
  const [profileImage, setProfileImage] = useState(
    require("../assets/avatar.jpg")
  );
  const [editableDescription, setEditableDescription] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await MyPostsScreenService.fetchUser();
      setUser(userData);
      setPosts(userData.posts);
      setProfileImage({ uri: userData.image });
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={user.posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )}
        renderItem={({ item, index }) => (
          <Post
            key={item._id}
            item={item}
            index={index}
            posts={posts}
            user={user}
            profileImage={profileImage}
            navigation={navigation}
            handleEditDescription={MyPostsScreenService.handleEditDescription}
            handleSaveDescription={MyPostsScreenService.handleSaveDescription}
            handleDeleteDescription={MyPostsScreenService.handleDeletePost}
            setEditableDescription={setEditableDescription}
            setEditedDescription={setEditedDescription}
            editableDescription={editableDescription}
            editedDescription={editedDescription}
            setUser={setUser}
          />
        )}
        keyExtractor={(item) => item._id}
      />
      <BottomNavigation style={styles.bottomNavigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
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
  editButton: {
    backgroundColor: "#eee",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 14,
    color: "#333",
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
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    padding: 10,
    backgroundColor: "#F7706E",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  chatBubble: {
    width: 28,
    height: 28,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  saveDeleteBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MyPostsScreen;
