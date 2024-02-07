/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Body from "./Css";
import { FormEvent, useEffect, useState, useRef } from "react";
import axios from "axios";
import User from "../../models/user";
import Post from "../../models/post";

const app = axios.create({
  baseURL: "http://localhost:10000",
});

function ProfileUser() {
  const [user, setUser] = useState<User>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const bioValue = useRef<HTMLTextAreaElement>(null);

  const getUser = async (token: string | null): Promise<User> => {
    try {
      const result = await app.post("/decode", { token });
      const email = result.data.email;
      const User = await app
        .get(`/user/${email}`)
        .then((result) => result.data);
      console.log(User);
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

      console.log(result);
      setPosts(result as any);
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

  const displayImage = (event: FormEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setUser((prevUser: User) => {
          const picture =
            typeof e.target?.result === "string" ? e.target?.result : "";
          return { ...prevUser, picture };
        });

        const form = document.getElementById("upfoto");
        if (form) {
          form.style.display = "flex";
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePhoto = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById("file");
    if (fileInput instanceof HTMLInputElement && fileInput.files?.length) {
      const file = fileInput.files[0];
      formData.append("file", file);
    }

    if (user.email !== undefined) {
      formData.append("email", user.email);
    }

    try {
      const result = await app.post("/updateImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result);
      const form = document.getElementById("addFoto");
      if (form) {
        form.style.display = "none";
      }
    } catch (error) {
      console.error("Erro ao atualizar a foto:", error);
    }
  };

  const showUpdateBio = async () => {
    const bio = document.getElementById("updateBio");
    if (bio) {
      bio.style.display = "flex";
    }
  };

  const updateBio = async () => {
    await app.post("/updateBio", {
      email: user.email,
      bio: bioValue.current?.value,
    });
    const bio = document.getElementById("updateBio");
    if (bio) {
      bio.style.display = "none";
    }
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
          <Link to="/post">➕</Link>
        </nav>

        <div className="profile">
          <form id="addFoto" onSubmit={handleUpdatePhoto}>
            <input type="submit" value="ATUALIZAR FOTO" id="upfoto" />
          </form>
          <div id="picture">
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={displayImage}
            />
            <label htmlFor="file" id="file-label">
              <img id="preview" src={user.picture} />
            </label>
          </div>
          <h2 id="profileName">{user.name}</h2>
          <small>{user.email}</small>
          <textarea
            name="profileBio"
            id="profileBio"
            cols={10}
            rows={3}
            onChange={(e) => {
              setUser({ ...user, bio: e.target.value });
              showUpdateBio();
            }}
            ref={bioValue}
            value={user.bio}
          ></textarea>
          <button id="updateBio" onClick={updateBio}>
            ATUALIZAR BIO
          </button>
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