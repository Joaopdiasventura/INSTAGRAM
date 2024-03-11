import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, ListRenderItem } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Like from "../../models/like";
import User from "../../models/user";
import Post from "../../models/post";

const app = axios.create({
  baseURL: "https://insta-mn2w.onrender.com",
});

function Start() {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | object>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getUser = async (token: string) => {
    try {
      const result = await app.post("/decode", { token });
      const email = result.data.email;
      const user = await app.get(`/user/${email}`).then((result) => result.data);
      setUser(user);
      return result.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return {};
    }
  };

  const getPosts = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token || token == undefined) {
      return;
    }
    try {
      const { email } = await getUser(token);
      const result = await app.get(`/post/${email}`).then((result) => result.data);
      for (let i = 0; i < result.length; i++) {
        result[i].fk_user_email = await app.get(`/user/${result[i].fk_user_email}`).then((result) => result.data);
        result[i].likes = await app.get(`/like/${result[i].id}`).then((result) => result.data);
      }
      setPosts(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const likePost = async (post: Post) => {
    try {
      if (user) {
        await app.post("/like", { email: ("email" in user ? user.email : ""), post: post.id });
        await getPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderPostItem: ListRenderItem<Post> = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("UserProfile" as never)}>
        <View style={styles.userContainer}>
          <Image style={styles.avatar} source={{ uri: ("picture" in item.fk_user_email ? item.fk_user_email.picture : "") }} />
          <Text style={styles.username}>{("name" in item.fk_user_email ? item.fk_user_email.name : "")}</Text>
        </View>
      </TouchableOpacity>
      <Image style={styles.postImage} source={{ uri: item.url_image.toString() }} />
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={() => likePost(item)} style={styles.button}>
          <Text style={styles.buttonText}>{item.likes && item.likes.length} {item.likes !== undefined && item.likes.some((like: Like) => like.fk_user_email === ("email" in user ? user.email : "")) ? "🖤" : "💛"}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Enter" as never)}>
          <Text style={styles.buttonText}>🌐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Search" as never)}>
          <Text style={styles.buttonText}>🔬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfileUser" as never)}>
          <Text style={styles.buttonText}>🏠</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>POSTS:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#520000" />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#520000",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#ddd",
    fontSize: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff"
  },
  postContainer: {
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "black",
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 0.5
  },
  
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default Start;
