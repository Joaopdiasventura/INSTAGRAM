import { Link, useNavigate } from "react-router-dom";
import Body from "./Css";
import { FormEvent, useEffect, useRef, useState } from "react";
import User from "../../models/user";
import axios from "axios";

const app = axios.create({
  baseURL: "https://insta-mn2w.onrender.com",
});

function Post() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({});
  const descriptionValue = useRef<HTMLTextAreaElement>(null);

  const getUser = async (token: string | null) => {
    try {
      const result = await app.post("/decode", { token });
      const email = result.data.email;
      const User = await app.get(`/user/${email}`);
      setUser(User.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const Post = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById("file");
    if (fileInput instanceof HTMLInputElement && fileInput.files?.length) {
      const file = fileInput.files[0];
      formData.append("file", file);
    }

    if (user.email !== undefined) {
      formData.append("fk_user_email", user.email);
    }

    if (descriptionValue.current != null) {
      formData.append("description", descriptionValue.current.value);
    }

    try {
      await app
        .post("/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          navigate("/user");
        });
    } catch (error) {
      console.error("Erro ao atualizar a foto:", error);
    }
  };

  const displayImage = (event: FormEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const picture =
          typeof e.target?.result === "string" ? e.target?.result : "";
        setUser((prevUser: User) => ({ ...prevUser, picture }));

        const previewImg = document.getElementById(
          "preview"
        ) as HTMLImageElement;
        if (previewImg) {
          previewImg.src = picture;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getUser(localStorage.getItem("token"));
  }, []);

  return (
    <Body>
      <div id="content">
        <nav>
          <Link to="/start">🏠</Link>
          <br />
          <Link to="/enter">🌐</Link>
          <br />
          <Link to="/search">🔬</Link> <br />
          <Link to="/user">⚪</Link>
        </nav>
        <form id="form" onSubmit={Post}>
          <h2>CRIE UM POST</h2> <br />
          <div id="picture">
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={displayImage}
              required
            />
            <label htmlFor="file" id="file-label">
              <img
                id="preview"
                src="https://icones.pro/wp-content/uploads/2021/02/icono-de-camara-gris.png"
                alt="Imagem padrão"
              />
            </label>
          </div>
          <br />
          <textarea
            name="descricao"
            id="descricao"
            placeholder="DESCRIÇÃO DO POST"
            ref={descriptionValue}
          ></textarea>
          <br />
          <input type="submit" value="PUBLICAR" />
        </form>
      </div>
    </Body>
  );
}

export default Post;