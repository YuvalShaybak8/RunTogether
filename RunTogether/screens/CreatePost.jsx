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

const CreatePost = ({ navigation }) => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
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
            const token = await AsyncStorage.getItem('token');

            const trimmedDescription = description.replace(/\n/g, ' ')

            const response = await client.post('/post', { description: trimmedDescription, location, image: image.imgUrl }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigation.navigate('Home Page');
            } catch (error) {
                console.log('error: ', error);
        }
    };  


    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const onUploaded = ( imgUrl ) => {
        setImage(imgUrl);
    }

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
                        <Image source={{ uri: image.imgUrl }} style={styles.image} />
                    ) : (
                        <Image
                            source={require("../assets/post_img2.jpg")}
                            style={styles.image}
                        />
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <ImgUploader onUploaded={onUploaded}/>
                    {/* <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                        <Text style={styles.uploadButtonText}>Upload your photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                        <Text style={styles.uploadButtonText}>Take a photo</Text>
                    </TouchableOpacity> */}
                </View>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder="Input description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <Autocomplete location={location} setLocation={setLocation}/>
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
