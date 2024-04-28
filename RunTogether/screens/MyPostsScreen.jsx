import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native";

import BottomNavigation from "../cmps/BottomNavigation";

const MyPostsScreen = ({ navigation, handlePressOutsideMenu }) => {
    return (
        <TouchableWithoutFeedback onPress={handlePressOutsideMenu}>
            <View style={styles.container}>
                <Text style={styles.title}>My posts</Text>
                <BottomNavigation />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default MyPostsScreen;
