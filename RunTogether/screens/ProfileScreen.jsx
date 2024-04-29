import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import BottomNavigation from "../cmps/BottomNavigation";

const ProfileScreen = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../assets/John Bol.jpg")}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <View>
                <Feather name="edit-3" size={16} color="white" />
              </View>
            </View>
          </View>
          <View style={styles.inputEditContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.icon}>
                <Feather name="user" size={22} color="black" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Jack Bol"
                placeholderTextColor="#7C808D"
                selectionColor="#3662AA"
              />
            </View>
          </View>
          <View style={styles.inputEditContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.icon}>
                <Feather name="mail" size={22} color="black" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Jack8@gmail.com"
                keyboardType="email-address"
                placeholderTextColor="#7C808D"
                selectionColor="#3662AA"
              />
            </View>
          </View>
          <View style={styles.inputEditContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.icon}>
                <Feather name="lock" size={22} color="black" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="********"
                keyboardType="email-address"
                placeholderTextColor="#7C808D"
                selectionColor="#3662AA"
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
          </View>
        </View>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
        <BottomNavigation />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    fontSize: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#fff",
  },
  editIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#F7706EFF",
    borderRadius: 20,
    padding: 8,
  },
  editIcon: {
    fontSize: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 150,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  fieldIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  fieldText: {
    fontSize: 16,
    flex: 1,
  },
  editButton: {
    flexDirection: "row",
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 50,
    borderColor: "gray",
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ff5252",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  showPasswordButton: {
    paddingHorizontal: 8,
  },
  showPasswordIcon: {
    fontSize: 24,
  },
  updateButton: {
    backgroundColor: "#ff5252",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 38,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  navIcon: {
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    marginTop: 10,
    height: 50,
    borderColor: "gray",
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 15,
  },
  inputEditContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  passwordVisibleButton: {
    position: "absolute",
    right: 10,
  },
});

export default ProfileScreen;
