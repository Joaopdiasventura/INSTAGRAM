import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Post from "../../models/post";
import User from "../../models/user";
import { useNavigation } from "@react-navigation/native";

const app = axios.create({
  baseURL: "https://insta-mn2w.onrender.com",
});

function ProfileUser() {
    const navigation = useNavigation();
  const [user, setUser] = useState<User | object>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const bioValue = useRef("");

  const getUser = async (token: string | null) => {
    try {
      const result = await app.post("/decode", { token });
      const email = result.data.email;
      const User = await app
        .get(`/user/${email}`)
        .then((result) => result.data);
      setUser(User);

      return result.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return {};
    }
  };

  const getPosts = async () => {
    try {
      const { email } = await getUser(await AsyncStorage.getItem("token"));

      const result = await app
        .get(`/user/posts/${email}`)
        .then((result) => result.data);

      for (let i = 0; i < result.length; i++) {
        result[i].fk_user_email = await app
          .get(`/user/${result[i].fk_user_email}`)
          .then((result) => result.data);
        result[i].likes = await app
          .get(`/like/${result[i].id}`)
          .then((result) => result.data);
      }

      setPosts(result);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const likePost = async (post: Post) => {
    if (!("email" in user)) {
      return;
    }
    try {
      await app.post("/like", { email: user.email, post: post.id });
      await getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.likeButton} onPress={() => {navigation.navigate("Enter" as never);}}>
          <Text style={styles.likeButtonText}>🌐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton} onPress={() => {navigation.navigate("Search" as never);}}>
          <Text style={styles.likeButtonText}>🔬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton} onPress={() => {navigation.navigate("Start" as never);}}>
          <Text style={styles.likeButtonText}>🏠</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity>
            <Image
              source={{ uri: "picture" in user ? user.picture : "" }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>
            {"name" in user ? user.name : ""}
          </Text>
          <Text style={styles.profileEmail}>
            {"email" in user ? user.email : ""}
          </Text>
          <TextInput
            style={styles.bioInput}
            multiline={true}
            numberOfLines={3}
            onChangeText={(text) => (bioValue.current = text)}
            value={"bio" in user ? user.bio : ""}
            editable={false}
          />
        </View>
        <View>
          {posts.map((post) => (
            <View key={post.id}>
              <Image
                style={styles.postImage}
                source={{ uri: post.url_image.toString() }}
              />
              <View>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => likePost(post)}
                >
                  <Text style={styles.likeButtonText}>
                    {post.likes !== undefined &&
                    post.likes.some(
                      (like) =>
                        like.fk_user_email ===
                        ("email" in user ? user.email : "")
                    )
                      ? "🖤"
                      : "💛"}{" "}
                    {post.likes && post.likes.length}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.description}>{post.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    padding: 20,
  },
  profile: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 5,
  },
  bioInput: {
    backgroundColor: "#525252",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    color: "#eee",
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "black",
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#fff",
    resizeMode: "cover",
    borderWidth: 0.5
  },
  likeButton: {
    backgroundColor: "#520000",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  likeButtonText: {
    color: "#ddd",
    fontSize: 20,
  },
  description: {
    color: "#fff",
    backgroundColor: "#fff"
  },
});

export default ProfileUser;