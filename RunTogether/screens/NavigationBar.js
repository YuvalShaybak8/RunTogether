import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { Feather } from "@expo/vector-icons";

const NavigationBar = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const goToLogin = () => {
        navigation.navigate('Login');
        setIsModalVisible(false);
    };

    const goToSignUp = () => {
        navigation.navigate('SignUp');
        setIsModalVisible(false);
    };

    const goToCreatePost = () => {
        navigation.navigate('Create Post');
    };

    const goToProfileScreen = () => {
        navigation.navigate('Profile Details');
    };

    const goToHomePage = () => {
        navigation.navigate('Home Page');
    };

    return (
        <View style={styles.container}>
            <Modal
                visible={isModalVisible}
                transparent
                animationType="fade"
                onRequestClose={toggleModal}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalOption} onPress={goToLogin}>
                            <Text style={styles.modalOptionText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={goToSignUp}>
                            <Text style={styles.modalOptionText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            <TouchableOpacity onPress={toggleModal}>
                <Feather name="user" size={24} color="#333" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToCreatePost}>
                <Feather name="plus" size={24} color="#333" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToHomePage}>
                <Feather name="home" size={24} color="#333" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
                <Feather name="menu" size={24} color="#333" style={styles.icon} />
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                transparent
                animationType="fade"
                onRequestClose={toggleModal}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalOption} onPress={goToProfileScreen}>
                            <Text style={styles.modalOptionText}>My Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>My Posts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f2f2f2',
    },
    icon: {
        marginHorizontal: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalOption: {
        paddingVertical: 10,
    },
    modalOptionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NavigationBar;