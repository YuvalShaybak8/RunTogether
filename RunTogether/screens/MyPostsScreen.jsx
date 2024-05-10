import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity,KeyboardAvoidingView,SafeAreaView } from 'react-native';
import client from '../backend/api/client.js';
import avatarImage from '../assets/avatar.jpg';
import placeholder from '../assets/placeholder.png';
import chat from '../assets/chat.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from '../cmps/BottomNavigation.jsx';

const MyPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [profileImage, setProfileImage] = useState(require("../assets/avatar.jpg"));

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const currentLoggedInUserID = await AsyncStorage.getItem('loggedInUserID');
      console.log('currentLoggedInUserID :>> ', currentLoggedInUserID);
      const userResponse = await client.get(`/user/${currentLoggedInUserID}`);
      const { data } = userResponse;
      console.log('data', data);
      setPosts(data.posts);
      setProfileImage({ uri: data.image });
      return data;
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
  }

  const renderPost = ({ item }) => (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.userContainer}>
            <Image source={profileImage || avatarImage} style={styles.profilePic} />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.postDate}>{item.postDate}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.postDescription}>{item.description}</Text>
          {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
          {item.location && (
            <View style={styles.locationContainer}>
              <Image source={placeholder} style={styles.locationIcon} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          )}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Image source={chat} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<Text style={styles.screenTitle}>My posts</Text>}
      />
      {/* Position BottomNavigation at the bottom */}
      <BottomNavigation style={styles.bottomNavigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#c1c1c2',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 8,
    color: '#333',
  },
  postDate: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 8,
  },
  editButton: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 14,
    color: '#333',
  },
  postDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    padding: 10,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4d4d',
  },
});

export default MyPostsScreen;