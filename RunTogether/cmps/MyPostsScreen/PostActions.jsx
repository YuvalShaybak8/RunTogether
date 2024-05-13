import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const PostActions = ({
  item,
  handleEditDescription,
  handleSaveDescription,
  handleDeletePost,
  editableDescription,
  editedDescription,
  setEditedDescription,
}) => {
  return (
    <View style={styles.actionContainer}>
      <View style={styles.saveDeleteBtns}>
        {editableDescription === item._id ? (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSaveDescription}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDeletePost}
            >
              <Text style={styles.saveButtonText}>Delete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditDescription}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    padding: 10,
    backgroundColor: "#F7706E",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  saveDeleteBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#eee",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 14,
    color: "#333",
  },
});

export default PostActions;
