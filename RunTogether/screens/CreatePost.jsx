import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { Autocomplete } from "../cmps/Autocomplete";
import { ImgUploader } from "../cmps/ImgUploader.jsx";
import ImagePreview from "../cmps/ImagePreview.jsx";

import * as ImagePicker from "expo-image-picker";
import { createPostService } from "../services/createPost.service";

const CreatePost = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

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

  const handlePostPress = () => {
    createPostService.handlePostPress(description, location, image, navigation);
  };

  const handleLocationSelect = (details) => {
    createPostService.handleLocationSelect(
      details,
      setLocation,
      isImageUploaded,
      setImage
    );
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onUploaded = (imgUrl) => {
    setImage(imgUrl);
    setIsImageUploaded(true);
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Create a post</Text>
          </View>

          <ImagePreview image={image} />

          <View style={styles.buttonContainer}>
            <ImgUploader onUploaded={onUploaded} />
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Input description"
            value={description}
            onChangeText={setDescription}
            multiline
            blurOnSubmit={true} // Add this line
            onSubmitEditing={handleDismissKeyboard}
          />
          <Autocomplete
            location={location}
            setLocation={setLocation}
            handleLocationSelect={handleLocationSelect}
          />
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={[styles.postButton, { marginBottom: 20 }]}
          onPress={handlePostPress}
        >
          <View style={styles.icon}>
            <Feather name="send" size={22} color="white" />
          </View>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
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
    height: 100,
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
    marginTop: 0,
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
    marginRight: 10,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  autocompleteContainer: {
    width: "100%",
    zIndex: "999",
    borderRadius: 10,
  },
});
export default CreatePost;
