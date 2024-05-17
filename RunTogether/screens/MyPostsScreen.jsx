import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
} from "react-native";
import client from "../backend/api/client.js";
import avatarImage from "../assets/avatar.jpg";
import placeholder from "../assets/placeholder.png";
import chat from "../assets/chat.png";
import chatBubble from "../assets/chatbubble.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNavigation from "../cmps/BottomNavigation.jsx";
import Post from "../cmps/MyPostsScreen/Post.jsx";
import { MyPostsScreenService } from "../services/myPostsScreen.service";

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

  useEffect(() => {
    // fetchUser();
    fetchUserData();
  }, [user.posts]);

  // const fetchUser = async () => {
  //   try {
  //     const currentLoggedInUserID = await AsyncStorage.getItem('loggedInUserID');
  //     const userResponse = await client.get(`/user/${currentLoggedInUserID}`);
  //     const { data } = userResponse;
  //     setUser(data);
  //     setPosts(data.posts);
  //     setProfileImage({ uri: data.image });
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching user posts:', error);
  //   }
  // }

  // const formatPostDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = {
  //     year: 'numeric',
  //     month: 'short',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   };
  //   return date.toLocaleString('en-US', options);
  // };

  // const handleEditDescription = (postId, description) => {
  //   setEditableDescription(postId);
  //   setEditedDescription(description);
  // };

  // const handleSaveDescription = async (postId, editedDescription) => {
  //   try {
  //     const updatedPosts = user.posts.map(post =>
  //       post._id === postId ? { ...post, description: editedDescription } : post
  //     );
  //     setUser(user => ({ ...user, posts: updatedPosts }));

  //     await client.put(`/post/${postId}`, { description: editedDescription });

  //     await client.put(`/user/${user._id}`, { posts: updatedPosts });

  //     console.log(`Saving description for post ${postId}: ${editedDescription}`);
  //     setEditableDescription(null);
  //   } catch (error) {
  //     console.error('Error saving description:', error);
  //   }
  // };

  // const renderPost = ({ item, index }) => {
  //   const isLastItem = index === posts.length - 1;

  //   return (<KeyboardAvoidingView style={styles.container} key={item._id} behavior="padding">
  //     <SafeAreaView style={styles.container}>
  //     <View style={[styles.postContainer, isLastItem && styles.postContainerLast]}>
  //         <View style={styles.userContainer}>
  //           <Image source={profileImage || avatarImage} style={styles.profilePic} />
  //           <View style={styles.userInfo}>
  //             <Text style={styles.username}>{user.username}</Text>
  //             {console.log('item.createdAt', item)}
  //             <Text style={styles.postDate}>{formatPostDate(item.createdAt)}</Text>
  //           </View>
  //           <TouchableOpacity style={styles.editButton} onPress={() => handleEditDescription(item._id)}>
  //             <Text style={styles.editButtonText}>Edit</Text>
  //           </TouchableOpacity>
  //         </View>
  //         {
  //           editableDescription === item._id ? (
  //             <TextInput
  //               style={styles.editableDescription}
  //               value={editedDescription}
  //               onChangeText={(text) => setEditedDescription(text)}
  //             />
  //           ) : (
  //             <Text style={styles.postDescription}>{item.description}</Text>
  //           )
  //         }
  //         {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
  //         {item.location && (
  //           <View style={styles.locationContainer}>
  //             <Image source={placeholder} style={styles.locationIcon} />
  //             <Text style={styles.locationText}>{item.location}</Text>
  //           </View>
  //         )}
  //         <View style={styles.actionContainer}>
  //           <TouchableOpacity>
  //             <Image source={chat} style={styles.chatBubble} />
  //           </TouchableOpacity>
  //           <View style={styles.saveDeleteBtns}>
  //             <TouchableOpacity style={styles.actionButton} onPress={() => handleSaveDescription(item._id, editedDescription)}>
  //               <Text style={styles.saveButtonText}>Save</Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity style={styles.actionButton} onPress={() => handleSaveDescription(item._id, editedDescription)}>
  //               <Text style={styles.saveButtonText}>Delete</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>
  //     </SafeAreaView>
  //   </KeyboardAvoidingView>
  // )};

  const fetchUserData = async () => {
    const userData = await MyPostsScreenService.fetchUser();
    setUser(userData);
    setPosts(userData.posts);
    setProfileImage({ uri: userData.image });
  };

  // return (
  //   <View style={styles.container}>
  //     <FlatList
  //       data={posts}
  //       renderItem={renderPost}
  //       keyExtractor={(item) => item._id}
  //     />
  //     <BottomNavigation style={styles.bottomNavigation} />
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <Post
            key={item._id}
            item={item}
            index={index}
            posts={posts}
            user={user}
            profileImage={profileImage}
            handleEditDescription={MyPostsScreenService.handleEditDescription}
            handleSaveDescription={MyPostsScreenService.handleSaveDescription}
            handleDeleteDescription={MyPostsScreenService.handleDeletePost}
            handleEditImage={MyPostsScreenService.handleEditImage}
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
