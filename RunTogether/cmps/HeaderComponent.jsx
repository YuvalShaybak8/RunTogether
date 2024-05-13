import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import avatarImage from "../assets/avatar.jpg";

export default function HeaderComponent({
  loggedInUserProfilePic,
  navigation,
}) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.profilePicContainer}
        onPress={() => navigation.navigate("Profile Details")}
      >
        {loggedInUserProfilePic ? (
          <Image
            source={{ uri: loggedInUserProfilePic }}
            style={styles.profilePic}
          />
        ) : (
          <Image source={avatarImage} style={styles.profilePic} />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>Run Together</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#F7706EFF",
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
    fontWeight: "bold",
    color: "white",
  },
});
