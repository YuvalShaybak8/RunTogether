import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';


const CreatePost = () => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        console.log('image', image)
    }, [image])

    const handlePostPress = () => {
        console.log('Description:', description);
        console.log('Location:', location);
        console.log('Image:', image);
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

        console.log('result: ', result.assets[0].uri);

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>

            <KeyboardAvoidingView style={styles.container} behavior="position" keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Post</Text>
                </View>
                <View style={styles.imageContainer}>
                    {image ? <Image source={{ uri: image }} style={styles.image} /> : <Image source={require('../assets/post_img2.jpg')} style={styles.image} />}
                </View>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadText}>Upload your photo</Text>
                </TouchableOpacity>
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
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        alignContent: 'center',
    },
    image: {
        width: '80%',
        height: 300,
        borderRadius: 40,
        resizeMode: 'contain',
        marginVertical: 16,
        alignSelf: 'center',
    },
    uploadText: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#F7706EFF',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
    },
    textarea: {
        height: 120,
        textAlignVertical: 'top',
        backgroundColor: '#F3F3F6FF',
        borderWidth: 0,
    },
    input: {
        height: 40,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#F3F3F6FF',
        padding: 8,
        marginTop: 8,
    },
    postButton: {
        flexDirection: "row",
        backgroundColor: '#F7706EFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 16,
        width: '33%',
        alignSelf: 'center'
    },
    icon: {
        marginRight: -20,
    },
    postButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreatePost;
