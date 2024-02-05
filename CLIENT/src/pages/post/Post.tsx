import { Link } from "react-router-dom";
import Body from "./Css";

function Post() {
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
        <form id="form">
          <h2>CRIE UM POST</h2> <br />
          <div id="picture">
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              required
            />
            <label htmlFor="file" id="file-label">
              <img
                id="preview"
                src="https://icones.pro/wp-content/uploads/2021/02/icono-de-camara-gris.png"
                alt="Imagem padrão"
              />
            </label>
          </div>{" "}
          <br />
          <textarea
            name="descricao"
            id="descricao"
            cols="30"
            rows="10"
            placeholder="DESCRIÇÃO DO POST"
            required
          ></textarea>{" "}
          <br />
          <input type="submit" value="PUBLICAR" />
        </form>
      </div>
    </Body>
  );
}

export default Post;
