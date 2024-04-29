import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import BottomNavigation from "../cmps/BottomNavigation";

const MyPostsScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleInputChange = (text) => {
        setEmail(text);
    };

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <View style={styles.container}>
                <Text style={styles.title}>My posts</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email address"
                        keyboardType="email-address"
                        placeholderTextColor="#7C808D"
                        selectionColor="#3662AA"
                        value={email}
                        onChangeText={handleInputChange}
                    />
                </View>
                <BottomNavigation />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
        borderColor: 'gray',
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    input: {
        fontSize: 16,
        height: 50,
    },
});

export default MyPostsScreen;
