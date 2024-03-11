import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../../models/user";
import Post from "../../models/post";

const app = axios.create({
  baseURL: "https://insta-mn2w.onrender.com",
});

function ProfileAnother() {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | object>({});
  const [profile, setProfile] = useState<User | object>({});
  const [follower, setFollower] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const getUser = async (token: string | null, search: string | null) => {
    console.log(search);
    
    try {
      const result = await app.post("/decode", { token });
      const email = result.data.email;
      console.log(email);
      
      const User = await app.get(`/user/${email}`).then((result) => result.data);
      setUser(User);

      const result2 = await app.post("/decode", { search });
      const email2 = result2.data.profile.email;
      console.log(email2);
      

      const Profile = await app.get(`/user/${email2}`).then((result) => result.data);
      setProfile(Profile);

      const Followers = await app.get(`/follower/${email2}`).then((result) => result.data);
      setFollower(Followers);

      return Profile;
    } catch (error) {
      console.error("Error fetching user:", error);
      return {};
    }
  };

  const getPosts = async () => {
    try {
      const { email } = await getUser(await AsyncStorage.getItem("token"), await AsyncStorage.getItem("search"));

      const result = await app.get(`/user/posts/${email}`).then((result) => result.data);

      for (let i = 0; i < result.length; i++) {
        result[i].fk_user_email = await app.get(`/user/${result[i].fk_user_email}`).then((result) => result.data);
        result[i].likes = await app.get(`/like/${result[i].id}`).then((result) => result.data);
        result[i].see = email;
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

  const follow = async () => {
    if (!("email" in user) || !("email" in profile)) {
        return;
    }
    await app.post("follow", {
      fk_user_email: user.email,
      fk_user_email_: profile.email,
    });
    const Followers = await app.get(`/follower/${profile.email}`).then((result) => result.data);
    setFollower(Followers);
  };

  const ifFollow = () => {
    if (!("email" in user)) {
        return;
    }
    for (let i = 0; i < follower.length; i++) {
      if (follower[i].email == user.email) {
        return "DEIXAR DE SEGUIR";
      }
    }
    return "SEGUIR";
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.navigate("Start" as never)}>
            <Text>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Enter" as never)}>
            <Text>🌐</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Search" as never)}>
            <Text>🔬</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profile}>
          <View id="picture">
            <Image style={styles.preview} source={{ uri: ("picture" in profile ? profile.picture : "") }} />
          </View>
          <Text style={styles.profileName}>{("picture" in profile ? profile.name : "")}</Text>
          <Text style={styles.profileBio}>{("picture" in profile ? profile.bio : "")}</Text>
          <TouchableOpacity style={styles.seguirButton} onPress={follow}>
            <Text>{ifFollow()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.posts}>
          {posts.map((post) => (
            <View style={styles.post} key={post.id}>
              <Image style={styles.postImage} source={{ uri: post.url_image.toString() }} />
              <View style={styles.texts}>
                <TouchableOpacity style={styles.likeButton} onPress={() => likePost(post)}>
                  <Text>{post.likes && post.likes.length} {post.likes !== undefined && post.likes.some((like) => like.fk_user_email === ("email" in user ? user.email : "")) ? "🖤" : "💛"}</Text>
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
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profile: {
    alignItems: "center",
    marginBottom: 20,
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileBio: {
    marginBottom: 10,
  },
  seguirButton: {
    backgroundColor: "#520000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  posts: {
    flexDirection: "column",
  },
  post: {
    marginBottom: 20,
  },
  postImage: {
    width: "100%",
    height: 200, // Você pode ajustar o tamanho da imagem conforme necessário
    marginBottom: 10,
  },
  texts: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeButton: {
    marginRight: 10,
  },
  description: {
    flex: 1,
  },
});

export default ProfileAnother;
