import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Feather } from "@expo/vector-icons"

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const handleLogin = () => {
        // Simulated authentication logic
        if (email === '' && password === '') {
            navigation.navigate('Home Page');
        } else {
            console.warn('Login failed. Invalid email or password');
            // You can display an error message to the user or clear the fields
            setEmail('');
            setPassword('');
        }
    };

    const handleSignUp = () => {
        // Navigate to the sign up screen
        navigation.navigate('Sign Up');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Run Together</Text>
            <View style={styles.inputContainer}>
                <View style={styles.icon}>
                    <Feather name="mail" size={22} color="#7C808D" />
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
                    <Feather name="lock" size={22} color="#7C808D" />
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
                        color="#7C808D"
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        width: "80%",
        alignItems: "center",
        marginBottom: 20,
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
        borderBottomWidth: 1.5,
        flex: 1,
        // paddingBottom: 10,
        borderBottomColor: "#eee",
        fontSize: 16,
        borderBottomWidth: 0, // Set to 0 to remove the underline

    },
    // input: {
    //     width: '80%',
    //     height: 40,
    //     borderColor: 'gray',
    //     borderRadius: 12,
    //     borderWidth: 1,
    //     marginVertical: 10,
    //     paddingHorizontal: 10,
    // },
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
        marginTop: 20,
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
