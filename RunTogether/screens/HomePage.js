import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, Keyboard, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from 'react-native-elements';

const HomePage = ({ navigation }) => {
    const [postText, setPostText] = useState('');
    const [runLength, setRunLength] = useState('');
    const [startingLocation, setStartingLocation] = useState('');
    const [motivateVisible, setMotivateVisible] = useState(false);
    const [letsRunVisible, setLetsRunVisible] = useState(false);
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [posts, setPosts] = useState([]);
    const [coordinates, setCoordinates] = useState(null);
    const googlePlacesAutocompleteRef = useRef(null);

    // Check userInterfaceStyle from app.json
    const isAutomaticInterfaceStyle = __DEV__ ? true : Constants.manifest.expo.userInterfaceStyle === 'automatic';

    const handlePost = () => {
        if (motivateVisible && postText.length === 0) {
            Keyboard.dismiss();
            return;
        }

        if (letsRunVisible && (runLength.length === 0)) {
            Keyboard.dismiss();
            return;
        }

        const newPost = {
            content: letsRunVisible ? null : postText,
            location: letsRunVisible ? startingLocation : null,
            runLength: letsRunVisible ? runLength : null,
            time: letsRunVisible ? selectedTime : null,
            coordinates: coordinates ? { latitude: coordinates.latitude, longitude: coordinates.longitude } : null,
        };

        setPosts([...posts, newPost]);
        setPostText('');
        setRunLength('');
        setSelectedTime(null);

        if (googlePlacesAutocompleteRef.current) {
            googlePlacesAutocompleteRef.current.clear();
        }
        Keyboard.dismiss();
        console.log(posts)
    }

    const handlePlaceSelect = async (details) => {
        try {
            const placeId = details.place_id;

            const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyA1VjNmmzJfMnMLd0Ta61hrZs7dy0sFArk`);
            const placeDetails = await response.json();
            const { lat, lng } = placeDetails.result.geometry.location;
            setCoordinates({ latitude: lat, longitude: lng });
            setStartingLocation(details.description)
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    }

    const handleTimeConfirm = (time) => {
        setSelectedTime(time);
        setTimePickerVisible(false);
    };

    const toggleTimePicker = () => {
        setTimePickerVisible(prevTimePickerVisible => !prevTimePickerVisible);
    };

    const goToPostScreen = () => {
        navigation.navigate('Create Post');
    }

    const goToProfileScreen = () => {
        navigation.navigate('Profile Details');
    }
    return (
        <View style={styles.container}>
            <>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { setLetsRunVisible(!letsRunVisible); setMotivateVisible(false) }} style={styles.button}>
                        <Text style={styles.buttonText}>Let's Run</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setMotivateVisible(!motivateVisible); setLetsRunVisible(false) }} style={styles.button}>
                        <Text style={styles.buttonText}>Motivate</Text>
                    </TouchableOpacity>
                </View>
                {(letsRunVisible || motivateVisible) && (
                    <View style={styles.contentContainer}>
                        <View style={styles.postInputContainer}>
                            {letsRunVisible && (
                                <>
                                    <TextInput
                                        style={[styles.input, isAutomaticInterfaceStyle && { color: '#000', fontSize: 16 }]}
                                        placeholder="Run Length (e.g. 5)"
                                        onChangeText={setRunLength}
                                        value={runLength}
                                        keyboardType="numeric"
                                        placeholderTextColor={isAutomaticInterfaceStyle ? '#000' : '#5d5d5d'}
                                        onEndEditing={() => {
                                            let numericRunLength = parseFloat(runLength);
                                            if (isNaN(numericRunLength) || numericRunLength < 0.1 || numericRunLength > 40) {
                                                console.warn("Please enter a number between 0.1 and 40.");
                                                setRunLength('');
                                                Keyboard.dismiss()
                                            }
                                        }}
                                    />

                                    <TouchableOpacity onPress={toggleTimePicker} style={styles.input}>
                                        <Text>{selectedTime ? selectedTime.toLocaleTimeString() : "Select Time"}</Text>
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
                                    placeholder='Pick a location...'
                                    textInputProps={{
                                        placeholderTextColor: isAutomaticInterfaceStyle ? '#000' : '#5d5d5d',
                                        returnKeyType: "search"
                                    }}
                                    onPress={handlePlaceSelect}
                                    query={{
                                        key: 'AIzaSyA1VjNmmzJfMnMLd0Ta61hrZs7dy0sFArk',
                                        language: 'en',
                                    }}
                                    nearbyPlacesAPI='GooglePlacesSearch'
                                    debounce={300}
                                    styles={{

                                        container: styles.autocompleteContainer,
                                        textInputContainer: {
                                            backgroundColor: 'rgba(0,0,0,0)',
                                            borderTopWidth: 0,
                                            borderBottomWidth: 0,
                                        },
                                        textInput: {
                                            marginLeft: 0,
                                            marginRight: 0,
                                            height: 38,
                                            color: '#5d5d5d',
                                            fontSize: 16,
                                        },
                                        predefinedPlacesDescription: {
                                            color: '#1faadb',
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
                    {posts?.map(post => (
                        <View key={post.runLength} style={styles.postContainer}>
                            <View style={styles.postHeader}>
                                <Text style={styles.postHeaderText}>{post.runLength}KM - {post.location}</Text>
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
            </>
            <TouchableOpacity onPress={goToPostScreen}>
                <Text >Go to create post screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToProfileScreen}>
                <Text >Go to profile screen</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'dodgerblue',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    postInputContainer: {
        marginBottom: 20,
    },
    postInput: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    postsContainer: {
        flex: 1,
    },
    post: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    postContent: {
        flex: 1,
        fontSize: 16,
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
    postBtn: {
        backgroundColor: 'dodgerblue',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    postBtnText: {
        color: '#fff',
        fontSize: 16,
    },
    map: {
        height: 200,
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    autocompleteContainer: {
        width: '100%',
        zIndex: "999",
        borderRadius: 10,
    },
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    postHeader: {
        backgroundColor: 'dodgerblue',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
    },
    postHeaderText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateTimePicker: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
});

export default HomePage;

