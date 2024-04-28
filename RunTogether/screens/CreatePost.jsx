import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const handlePostPress = async () => {
    try {
      const newPost = {
        image: image, // Pass the image URI or null if no image is selected
        description: description,
        location: location,
      };

      const response = await fetch("http://localhost:3030/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with your JWT token
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        // Optionally handle successful post creation
        console.log("Post created successfully");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri); // Update the state with the URI of the selected image
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri); // Update the state with the URI of the captured photo
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Post</Text>
        </View>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image
              source={require("../assets/post_img2.jpg")}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>Upload your photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
            <Text style={styles.uploadButtonText}>Take a photo</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Input description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your location... (optional)"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePostPress}>
          <View style={styles.icon}>
            <Feather name="send" size={22} color="white" />
          </View>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    alignContent: "center",
  },
  image: {
    width: "70%",
    height: 250,
    borderRadius: 80,
    resizeMode: "contain",
    marginVertical: 16,
    alignSelf: "center",
  },
  uploadText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#F7706EFF",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 6,
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
    backgroundColor: "#F3F3F6FF",
    borderWidth: 0,
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#F3F3F6FF",
    padding: 8,
    marginTop: 8,
  },
  postButton: {
    flexDirection: "row",
    backgroundColor: "#F7706EFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 16,
    width: "33%",
    alignSelf: "center",
  },
  icon: {
    marginRight: -20,
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // New button styles
  uploadButton: {
    flexDirection: "row",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 40,
    borderColor: "gray",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#ff5252",
    marginRight: 10, // Add marginRight to create space between buttons
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row", // Arrange items horizontally
    justifyContent: "space-between", // Space evenly between items
    marginBottom: 10, // Optional: Add margin bottom to the container
  },
});
export default CreatePost;
