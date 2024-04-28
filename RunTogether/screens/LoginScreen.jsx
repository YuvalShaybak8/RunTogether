import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Image } from 'react-native';
import { Feather } from "@expo/vector-icons"
import client from '../backend/api/client.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const handleLogin = async () => {
        try {
            const response = await client.post('/user/login', { email, password });
            console.log('Login successful:', response.data);
            const token = response.data.token;
            await AsyncStorage.setItem('token', token);
            navigation.navigate('Home Page')
            // Handle successful login, e.g., store user data in local storage or redirect to another page
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.warn('Login failed. Invalid email or password');
            } else {
                console.error('Error logging in:', error.message);
            }
        }
    };

    const handleSignUp = () => {
        navigation.navigate('Sign Up');
    };

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="dark-content" />
                    <View style={styles.content}>
                        <Image source={require('../assets/logo.png')} style={styles.logo} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Run Together</Text>
                            <Text style={styles.subtitle}>Log into your account</Text>
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

                        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                            <Text style={styles.signupText}>Didn't sign up yet?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Log in</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: '#9095A0FF',
        marginBottom: 40
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
    signupButton: {
        alignItems: 'flex-end',
        width: '80%',
    },
    signupText: {
        marginTop: 12,
        color: '#C70E0AFF',
    },
});

export default LoginScreen;
