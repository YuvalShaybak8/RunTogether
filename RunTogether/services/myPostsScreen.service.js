import client from "../backend/api/client.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyPostsScreenService = {
  fetchUser: async () => {
    try {
      const currentLoggedInUserID = await AsyncStorage.getItem(
        "loggedInUserID"
      );
      console.log("currentLoggedInUserID", currentLoggedInUserID);
      const userResponse = await client.get(`/user/${currentLoggedInUserID}`);
      const { data } = userResponse;
      return data;
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  },

  formatPostDate: (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  },

  handleEditDescription: (
    postId,
    description,
    setEditableDescription,
    setEditedDescription
  ) => {
    setEditableDescription(postId);
    setEditedDescription(description);
  },

  handleSaveDescription: async (
    postId,
    editedDescription,
    setEditableDescription,
    user,
    setUser
  ) => {
    try {
      const updatedPosts = user.posts.map((post) =>
        post._id === postId ? { ...post, description: editedDescription } : post
      );
      setUser((user) => ({ ...user, posts: updatedPosts }));

      await client.put(`/post/${postId}`, { description: editedDescription });

      await client.put(`/user/${user._id}`, { posts: updatedPosts });

      console.log(
        `Saving description for post ${postId}: ${editedDescription}`
      );
      setEditableDescription(null);
    } catch (error) {
      console.error("Error saving description:", error);
    }
  },

  handleDeletePost: async (postId, user, setUser) => {
    try {
      const updatedPosts = user.posts.filter((post) => post._id !== postId);
      setUser((user) => ({ ...user, posts: updatedPosts }));

      await client.delete(`/post/${postId}`);

      await client.put(`/user/${user._id}`, { posts: updatedPosts });

      console.log(`Deleting post ${postId}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  },

  handleEditImage: async (postId, user, setUser) => {
    try {
    } catch (error) {
      console.error("Error editing Image:", error);
    }
  },
};
