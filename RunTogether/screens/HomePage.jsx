import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet,KeyboardAvoidingView,RefreshControl,SafeAreaView,StatusBar,TouchableOpacity } from 'react-native';
import BottomNavigation from "../cmps/BottomNavigation";
import client from '../backend/api/client.js';
import axios from 'axios';
import avatarImage from '../assets/avatar.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomePage = ({ navigation, handlePressOutsideMenu }) => {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loggedInUserID, setLoggedInUserID] = useState(null)
  const [loggedInUserProfilePic, setLoggedInUserProfilePic] = useState(avatarImage);

useEffect(() => {
  fetchData();
  fetchLoggedInUserProfilePic()
}, [loggedInUserProfilePic]);

const fetchData = async () => {
  try {
    const postsResponse = await client.get('/post');
    const posts = postsResponse.data;

    // Fetch user details for each post
    const postsWithUserData = await Promise.all(
      posts.map(async (post) => {
        try {
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
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle the error, maybe set a default value for userProfilePic and username
          return { ...post, userProfilePic: null, username: 'Unknown', postDate: '' };
        }
      })
    );

    setPosts(postsWithUserData);
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Handle the error, maybe display an error message to the user
  }
};


  const fetchLoggedInUserProfilePic = async () => {
    try {
      const currentLoggedInUserID = await AsyncStorage.getItem('loggedInUserID');
      setLoggedInUserID(currentLoggedInUserID);
      const userResponse = await client.get(`/user/${currentLoggedInUserID}`);
      const { data } = userResponse;
      const userProfilePic = data.image;
      setLoggedInUserProfilePic(userProfilePic || null);
      console.log('userProfilePic', userProfilePic)
      return userProfilePic;
    } catch (error) {
      console.error('Error fetching logged in user profile picture:', error);
      setLoggedInUserProfilePic(null); 
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true); 
    fetchData(); 
    setIsRefreshing(false); 
  };

  const HeaderComponent = ({ loggedInUserProfilePic }) => (
    <View style={styles.headerContainer}>
      <View style={styles.profilePicContainer}>
        {loggedInUserProfilePic ? (
          <Image
            source={{ uri: loggedInUserProfilePic }}
            style={styles.profilePic}
          />
        ) : (
          <Image source={avatarImage} style={styles.profilePic} />
        )}
      </View>
      <Text style={styles.title}>Run Together</Text>
    </View>
  );
  

  const renderPost = ({ item, index }) => {
    const isLastItem = index === posts.length - 1;
  
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PostDetails', { post: item })}
        activeOpacity={0.8}
      >
        <View style={[styles.postContainer, isLastItem && styles.postContainerLast]}>
          <View style={styles.userContainer}>
            {item.userProfilePic ? (
              <Image source={{ uri: item.userProfilePic }} style={styles.profilePic} />
            ) : (
              <Image source={avatarImage} style={styles.profilePic} />
            )}
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
      </TouchableOpacity>
    );
  };
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HeaderComponent loggedInUserProfilePic={loggedInUserProfilePic} />
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
    backgroundColor: '#f9f9f9',
    marginTop: 50
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
  postContainerLast: {
    marginBottom: 60,
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
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 8,
    color: '#333',
  },
  postDate: {
    fontSize: 12,
    color: '#666',
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
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  likeCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  profilePicContainer: {
    marginRight: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noPosts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noPostsText: {
    fontSize: 18,
    color: '#888',
  },
});


export default HomePage;
