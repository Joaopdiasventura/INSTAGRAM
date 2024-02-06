/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Body from "./Css";
import { useEffect, useState } from "react";
import axios from "axios";

const app = axios.create({
  baseURL: "https://insta-mn2w.onrender.com"
});

function Start() {
const [user, setUser] = useState({});
const [posts, setPosts]: any = useState([]);

const getUser = async (token: string | null) => {
  try {
    const result = await app.post("/decode", { token });
    setUser(result.data);
    return result.data as any;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const getPosts = async () => {
  try {
    const { email } = await getUser(localStorage.getItem("token"));
    console.log(email);

    const result = await app.get(`/post/${email}`).then(result => result.data);

    for (let i = 0; i < result.length; i++) {
      result[i].fk_user_email = await app.get(`/user/${result[i].fk_user_email}`).then(result => result.data);
      result[i].likes = await app.get(`/like/${result[i].id}`).then(result => result.data);
      result[i].see = email;
    }

    console.log(result);
    setPosts(result as any);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const likePost = async (post) => {
  try {
    await app.post("/like", {email: user.email, post: post.id}); 
    await getPosts();
  } catch (error) {
    console.log(error);
  }
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
          <Link to="/profile">⚪</Link>
          <Link to="/post">➕</Link>
        </nav>
        <h1>POSTS:</h1>
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="profile">
              <img className="profileImage" src={post.fk_user_email.picture} alt="" />
              <h3 className="profileName">{post.fk_user_email.name}</h3>
              </div>

              <img className="postImage" src={post.url_image} alt="" />
              <div className="texts">
                <button className="like" onClick={()=>{likePost(post)}}>{post.likes.some(like => like.fk_user_email === user.email) ? "🖤" : "💛"} {(post.likes).length}</button>
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
