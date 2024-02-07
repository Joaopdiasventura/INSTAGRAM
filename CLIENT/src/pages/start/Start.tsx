/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import Body from "./Css";
import { useEffect, useState } from "react";
import axios from "axios";
import User from "../../models/user";
import Post from "../../models/post";

const app = axios.create({
  baseURL: "https://insta-mn2w.onrender.com",
});

function Start() {
  const [user, setUser] = useState<User>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const getUser = async (token: string | null): Promise<User> => {
    try {
      const result = await app.post("/decode", { token });
      const email = result.data.email;
      const User = await app
        .get(`/user/${email}`)
        .then((result) => result.data);
      setUser(User);

      return result.data as User;
    } catch (error) {
      console.error("Error fetching user:", error);
      return {};
    }
  };

  const getPosts = async () => {
    try {
      const { email } = await getUser(localStorage.getItem("token"));

      const result: Post[] = await app
        .get(`/post/${email}`)
        .then((result) => result.data);

      for (let i = 0; i < result.length; i++) {
        result[i].fk_user_email = await app
          .get(`/user/${result[i].fk_user_email}`)
          .then((result) => result.data);
        result[i].likes = await app
          .get(`/like/${result[i].id}`)
          .then((result) => result.data);
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

  const changePage = async (profile: User) => {
    const token = await app.post("/code", {profile});
    localStorage.setItem("search", token.data); 
    setTimeout(() => {
      navigate("/search/user");
    }, 100);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Body>
      <div className="content">
        <nav>
          <Link to="/enter">🌐</Link>
          <Link to="/search">🔬</Link>
          <Link to="/user">⚪</Link>
          <Link to="/post">➕</Link>
        </nav>
        <h1>POSTS:</h1>
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="profile" onClick={()=>{changePage(post.fk_user_email)}}>
                <img
                  className="profileImage"
                  src={post.fk_user_email.picture}
                  alt=""
                />
                <h3 className="profileName">{post.fk_user_email.name}</h3>
              </div>

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

export default Start;