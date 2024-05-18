import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
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
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onSavePress = async () => {
    setSaveLoading(true);
    try {
      await handleSaveDescription();
    } catch (error) {
      console.error("Error saving description:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const onDeletePress = async () => {
    setDeleteLoading(true);
    try {
      await handleDeletePost();
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <View style={styles.actionContainer}>
      <View style={styles.saveDeleteBtns}>
        {editableDescription === item._id ? (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onSavePress}
              disabled={saveLoading}
            >
              {saveLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Save</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onDeletePress}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Delete</Text>
              )}
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
