/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Body from "./Css";
import { useEffect, useState } from "react";
import axios from "axios";
import User from "../../models/user";
import Post from "../../models/post";

const app = axios.create({
  baseURL: "https://insta-mn2w.onrender.com",
});

function ProfileUser() {
  const [user, setUser] = useState<User>({});
  const [profile, setProfile] = useState<User>({});
  const [follower, setFollower] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const getUser = async (
    token: string | null,
    search: string | null
  ): Promise<User> => {
    try {
      const result = await app.post("/decode", { token });
      const email = result.data.email;
      const User = await app
        .get(`/user/${email}`)
        .then((result) => result.data);
      setUser(User);

      const result2 = await app.post("/decode", { token: search });
      const email2 = result2.data.profile.email;

      const Profile = await app
        .get(`/user/${email2}`)
        .then((result) => result.data);
      setProfile(Profile);

      const Followers = await app
        .get(`/follower/${email2}`)
        .then((result) => result.data);
      setFollower(Followers);

      return Profile as User;
    } catch (error) {
      console.error("Error fetching user:", error);
      return {};
    }
  };

  const getPosts = async () => {
    try {
      const { email } = await getUser(
        localStorage.getItem("token"),
        localStorage.getItem("search")
      );

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
        result[i].see = email;
      }

      setPosts(result as Post[]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const likePost = async (post: Post) => {
    try {
      await app.post("/like", { email: user.email, post: post.id });
      await getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const follow = async () => {
    await app.post("follow", {
      fk_user_email: user.email,
      fk_user_email_: profile.email,
    });
    const Followers = await app
      .get(`/follower/${profile.email}`)
      .then((result) => result.data);
    setFollower(Followers);
  };

  const ifFollow = () => {
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
    <Body>
      <div className="content">
        <nav>
          <Link to="/start">🏠</Link>
          <Link to="/enter">🌐</Link>
          <Link to="/search">🔬</Link>
          <Link to="/user">⚪</Link>
        </nav>

        <div className="profile">
          <div id="picture">
            <img id="preview" src={profile.picture} />
          </div>
          <h2 id="profileName">{profile.name}</h2>
          <p id="profileBio">{profile.bio}</p>
          <br />
          {profile.email === user.email ? null : (
            <button id="seguir" onClick={follow}>
              {ifFollow()}
            </button>
          )}
        </div>

        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <img className="postImage" src={post.url_image} alt="" />
              <div className="texts">
                <button
                  className="like"
                  onClick={() => {
                    likePost(post);
                  }}
                >
                  {post.likes !== undefined &&
                  post.likes.some((like) => like.fk_user_email === user.email)
                    ? "🖤"
                    : "💛"}{" "}
                  {post.likes && post.likes.length}
                </button>
                <p className="description">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Body>
  );
}

export default ProfileUser;