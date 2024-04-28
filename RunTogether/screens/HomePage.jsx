import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BottomNavigation from "./BottomNavigation";

const HomePage = ({ navigation, handlePressOutsideMenu }) => {
  const [postText, setPostText] = useState("");
  const [runLength, setRunLength] = useState("");
  const [startingLocation, setStartingLocation] = useState("");
  const [motivateVisible, setMotivateVisible] = useState(false);
  const [letsRunVisible, setLetsRunVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [posts, setPosts] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const googlePlacesAutocompleteRef = useRef(null);

  // Check userInterfaceStyle from app.json
  const isAutomaticInterfaceStyle = __DEV__
    ? true
    : Constants.manifest.expo.userInterfaceStyle === "automatic";

  const handlePost = async () => {
    try {
      const newPost = {
        image: "", // Add image URL here if you have image upload functionality
        description: postText,
        location: startingLocation,
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
        const savedPost = await response.json();
        setPosts([...posts, savedPost]);
        setPostText("");
        setStartingLocation("");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handlePlaceSelect = async (details) => {
    try {
      const placeId = details.place_id;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyA1VjNmmzJfMnMLd0Ta61hrZs7dy0sFArk`
      );
      const placeDetails = await response.json();
      const { lat, lng } = placeDetails.result.geometry.location;
      setCoordinates({ latitude: lat, longitude: lng });
      setStartingLocation(details.description);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    setTimePickerVisible(false);
  };

  const toggleTimePicker = () => {
    setTimePickerVisible((prevTimePickerVisible) => !prevTimePickerVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setLetsRunVisible(!letsRunVisible);
              setMotivateVisible(false);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Let's Run</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setMotivateVisible(!motivateVisible);
              setLetsRunVisible(false);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Motivate</Text>
          </TouchableOpacity>
        </View>
        {(letsRunVisible || motivateVisible) && (
          <View style={styles.contentContainer}>
            <View style={styles.postInputContainer}>
              {letsRunVisible && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Run Length (e.g. 5)"
                    onChangeText={setRunLength}
                    value={runLength}
                    keyboardType="numeric"
                    onEndEditing={() => {
                      let numericRunLength = parseFloat(runLength);
                      if (
                        isNaN(numericRunLength) ||
                        numericRunLength < 0.1 ||
                        numericRunLength > 40
                      ) {
                        console.warn(
                          "Please enter a number between 0.1 and 40."
                        );
                        setRunLength("");
                        Keyboard.dismiss();
                      }
                    }}
                  />

                  <TouchableOpacity
                    onPress={toggleTimePicker}
                    style={styles.input}
                  >
                    <Text>
                      {selectedTime
                        ? selectedTime.toLocaleTimeString()
                        : "Select Time"}
                    </Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={timePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={toggleTimePicker}
                  />
                </>
              )}
              {letsRunVisible && (
                <GooglePlacesAutocomplete
                  ref={googlePlacesAutocompleteRef}
                  placeholder="Pick a location..."
                  onPress={handlePlaceSelect}
                  query={{
                    key: "YOUR_API_KEY",
                    language: "en",
                  }}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={300}
                  styles={{
                    container: styles.autocompleteContainer,
                    textInputContainer: {
                      backgroundColor: "rgba(0,0,0,0)",
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    textInput: {
                      marginLeft: 0,
                      marginRight: 0,
                      height: 38,
                      color: "#5d5d5d",
                      fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                      color: "#1faadb",
                    },
                  }}
                />
              )}

              {motivateVisible && (
                <TextInput
                  style={styles.postInput}
                  placeholder="Write a motivating post..."
                  onChangeText={setPostText}
                  value={postText}
                />
              )}
              <TouchableOpacity onPress={handlePost} style={styles.postBtn}>
                <Text style={styles.postBtnText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <ScrollView style={styles.postsContainer}>
          {posts?.map((post, index) => (
            <View key={index} style={styles.postContainer}>
              <View style={styles.postHeader}>
                <Text style={styles.postHeaderText}>
                  {post.runLength}KM - {post.location}
                </Text>
              </View>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: post.coordinates.latitude,
                  longitude: post.coordinates.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                scrollEnabled={false}
                zoomEnabled={true}
              >
                <Marker
                  coordinate={{
                    latitude: post.coordinates.latitude,
                    longitude: post.coordinates.longitude,
                  }}
                  title="Marker Title"
                  description="Marker Description"
                />
              </MapView>
            </View>
          ))}
        </ScrollView>
        <BottomNavigation />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  postInputContainer: {
    marginBottom: 20,
  },
  postInput: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  postsContainer: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    backgroundColor: "dodgerblue",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  postHeaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    height: 200,
  },
  autocompleteContainer: {
    width: "100%",
    zIndex: "999",
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  postBtnText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HomePage;
