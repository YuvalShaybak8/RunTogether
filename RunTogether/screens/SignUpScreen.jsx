import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from "@expo/vector-icons"
import axios from 'axios'; // Import Axios for making HTTP requests

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const handleSignUp = async () => {
        try {
            const response = await axios.post('YOUR_BACKEND_API_URL/signup', {
                email,
                password,
                username
            });
            console.log('Sign-up successful:', response.data);
            navigation.goBack(); // Redirect to login screen after sign-up
        } catch (error) {
            console.error('Error signing up:', error.message);
            // Handle sign-up error, e.g., display an error message to the user
        }
    };

    const handleLoginRedirect = () => {
        navigation.goBack();
    };

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}
            >
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="dark-content" />
                    <View style={styles.content}>
                        <Image source={require('../assets/logo.png')} style={styles.logo} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Sign up</Text>
                            <Text style={styles.subtitle}>Create your account</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.icon}>
                                <Feather name="user" size={22} color="black" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your user name"
                                placeholderTextColor="#7C808D"
                                selectionColor="#3662AA"
                                onChangeText={setUsername}
                                value={username}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.icon}>
                                <Feather name="mail" size={22} color="black" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email address"
                                keyboardType="email-address"
                                placeholderTextColor="#7C808D"
                                selectionColor="#3662AA"
                                onChangeText={setEmail}
                                value={email}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.icon}>
                                <Feather name="lock" size={22} color="black" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#7C808D"
                                selectionColor="#3662AA"
                                secureTextEntry={!passwordIsVisible}
                                onChangeText={setPassword}
                                value={password}
                            />
                            <TouchableOpacity
                                style={styles.passwordVisibleButton}
                                onPress={() => setPasswordIsVisible(!passwordIsVisible)}
                            >
                                <Feather
                                    name={passwordIsVisible ? "eye" : "eye-off"}
                                    size={20}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                            <Text style={styles.loginButtonText}>Create your account</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 220,
        height: 150,
        marginBottom: 20,
    },
    titleContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: '#9095A0FF',
    },
    inputContainer: {
        flexDirection: "row",
        width: "80%",
        alignItems: "center",
        marginBottom: 10,
        height: 50,
        borderColor: 'gray',
        borderRadius: 12,
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 15,
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderBottomWidth: 0, // Set to 0 to remove the underline
    },
    passwordVisibleButton: {
        position: "absolute",
        right: 10,
    },
    loginButton: {
        backgroundColor: '#f7706d',
        width: '80%',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 30,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SignUpScreen;
