import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet,KeyboardAvoidingView,RefreshControl,SafeAreaView,StatusBar } from 'react-native';
import BottomNavigation from "../cmps/BottomNavigation";
import client from '../backend/api/client.js';
import axios from 'axios';
import avatarImage from '../assets/avatar.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomePage = ({ navigation, handlePressOutsideMenu }) => {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loggedInUserID, setLoggedInUserID] = useState(null)

useEffect(() => {
  fetchData();
  fetchLoggedInUserProfilePic()
}, []);

  const fetchData = async () => {
    try {
      const postsResponse = await client.get('/post');
      const posts = postsResponse.data;

      // Fetch user details for each post
      const postsWithUserData = await Promise.all(
        posts.map(async (post) => {
          const userResponse = await client.get(`/user/${post.user}`);
          const userData = userResponse.data;
          const postDate = new Date(userData.createdAt).toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
           }); 
          return { ...post, userProfilePic: userData.image, username: userData.username, postDate };
        })
      );

      setPosts(postsWithUserData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLoggedInUserProfilePic = async () => {
    const currentLoggedInUserID = await AsyncStorage.getItem('loggedInUserID');
    const userResponse = await client.get(`/user/${loggedInUserID}`);
    const {data} = userResponse;
    const userProfilePic = data.image
    console.log('userProfilePic', userProfilePic)
    return userProfilePic
  }

  const handleRefresh = () => {
    setIsRefreshing(true); 
    fetchData(); 
    setIsRefreshing(false); 
  };

  

  const renderPost = ({ item }) => {

  return (
    <View style={styles.postContainer}>
      <View style={styles.userContainer}>
{item.userProfilePic ? 
  <Image source={{ uri: item.userProfilePic }} style={styles.profilePic} /> : 
  <Image source={avatarImage} style={styles.profilePic} />
}
        <Text style={styles.userName}>{item.username}</Text>
        <Text style={styles.postDate}>{item.postDate}</Text>
      </View>
      <Text style={styles.postDescription}>{item.description}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
      {item.location && (
        <View style={styles.locationContainer}>
          {item.location && <Text style={styles.locationText}>{item.location}</Text>}
        </View>
      )}
      {item.likes && <Text style={styles.likeCount}>{item.likes} likes</Text>}
    </View>
  );
};

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="dark-content" />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        refreshControl={ 
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          if (offsetY <= 0) {
            handleRefresh(); 
          }
        }}
      />
      <BottomNavigation />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  postDate: {
    color: 'gray',
  },
  postDescription: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  locationContainer: {
    marginBottom: 10,
  },
  locationText: {
    marginBottom: 5,
  },
  mapImage: {
    width: '100%',
    height: 150,
  },
  likeCount: {
    color: 'gray',
  },
});

export default HomePage;
