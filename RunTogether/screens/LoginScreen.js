import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Image source={require('../assets/email-left-icon.svg')} style={styles.emailSvg} />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
                <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>
            <Text style={styles.signupText}>Didn't sign up yet?</Text>
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
    emailSvg: {
        position: absolute,
        top: '16px',
        right: '16px',
        width: '20px',
        height: '20px',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputView: {
        width: '80%',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
    },
    inputText: {
        height: 50,
        color: 'black',
    },
    loginBtn: {
        width: '80%',
        backgroundColor: '#fe9836',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    signupBtn: {
        width: '80%',
        backgroundColor: '#003f5c',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    loginText: {
        color: 'white',
    },
    signupText: {
        marginTop: 20,
        color: 'gray',
    },
});

export default LoginScreen;
