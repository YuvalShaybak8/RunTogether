import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
            <Text style={styles.logo}>Run Together</Text>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#fe9836',
        marginBottom: 40,
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
});

export default LoginScreen;
