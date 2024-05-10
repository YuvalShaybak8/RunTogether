import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostDetails = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {post.userProfilePic ? (
          <Image source={{ uri: post.userProfilePic }} style={styles.profilePic} />
        ) : (
          <Image source={avatarImage} style={styles.profilePic} />
        )}
        <Text style={styles.userName}>{post.username}</Text>
        <Text style={styles.postDate}>{post.postDate}</Text>
      </View>
      <Text style={styles.postDescription}>{post.description}</Text>
      {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
      {post.location && (
        <View style={styles.locationContainer}>
          {post.location && <Text style={styles.locationText}>{post.location}</Text>}
        </View>
      )}
      {post.likes && <Text style={styles.likeCount}>{post.likes} likes</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    paddingVertical: 20,
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
    marginRight: 5,
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
});

export default PostDetails;