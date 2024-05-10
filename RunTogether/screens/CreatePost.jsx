import React, { useEffect, useState, useRef } from "react";
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
    ScrollView
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Autocomplete } from "../cmps/Autocomplete";
import * as ImagePicker from "expo-image-picker";
import client from '../backend/api/client.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ImgUploader } from "../cmps/ImgUploader.jsx";
import { uploadService } from '../services/upload.service';

const CreatePost = ({ navigation }) => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const googlePlacesAutocompleteRef = useRef(null)

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
            if (!description.trim()) {
                alert("Please enter a description.");
                return;
            }

            const token = await AsyncStorage.getItem('token');
            const currentLoggedInUserID = await AsyncStorage.getItem('loggedInUserID');
            const trimmedDescription = description.replace(/\n/g, ' ')            
            console.log('image', image, 'location', location, 'description', trimmedDescription, 'token', token, 'currentLoggedInUserID', currentLoggedInUserID)
            await client.post('/post', { description: trimmedDescription, location, image: image?.imgUrl }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        
            const response = await client.get('/user/' + currentLoggedInUserID);
            const existingUser = response.data;
            console.log('existingUser',existingUser)
            if (existingUser) {
              const updatedUser = {...updatedUser, posts: [...existingUser.posts, { description: trimmedDescription, location, image: image?.imgUrl }]};

            const response = await client.put(`/user/${currentLoggedInUserID}`, updatedUser);
            navigation.navigate('Home Page');
        }} catch (error) {
            console.log('error: ', error);
        }
    };

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const onUploaded = (imgUrl) => {
        setImage(imgUrl);
        setIsImageUploaded(true);
    };

    const handleLocationSelect = async (details) => {
        try {
            setLocation(details.description);
            const placeId = details.place_id;
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=AIzaSyBtoaDHY9OmHFBh9oIBmzADt_R6wR1uC2Q`);
            const data = await response.json();
            const { lat, lng } = data.result.geometry.location;
            const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&size=600x300&zoom=15&markers=color:red%7C${lat},${lng}&key=AIzaSyBtoaDHY9OmHFBh9oIBmzADt_R6wR1uC2Q`;
            const base64Img = `data:image/jpg;base64,${await fetch(mapUrl).then(response => response.blob()).then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }))}`;
            const imgData = await uploadService.uploadImg(base64Img);

            setImage({ imgUrl: imgData.secure_url });
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };
    

    return (
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="position"
                keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
            >
                <View style={styles.header}>
                    <Text style={styles.headerText}>Post</Text>
                </View>

                <View style={styles.imageContainer}>
                    {image ? (
                        <Image source={{ uri: image.imgUrl }} style={styles.image} />
                    ) : (
                        <TouchableOpacity onPress={() => navigation.navigate('ImgUploader')}>
                            <Image
                                source={require("../assets/post_img2.jpg")}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    )}
                </View>
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
                />
                <Autocomplete location={location} setLocation={setLocation} handleLocationSelect={handleLocationSelect} />
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
        marginBottom: 10,
    },
    autocompleteContainer: {
        width: "100%",
        zIndex: "999",
        borderRadius: 10,
    },
});
export default CreatePost;
