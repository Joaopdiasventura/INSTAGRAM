import { Link } from "react-router-dom";
import Body from "./Css";

function ProfileUser() {
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
          <form id="addFoto">
            <input type="submit" value="ATUALIZAR FOTO" id="upfoto" />
          </form>
          <div id="picture">
            <input type="file" name="file" id="file" accept="image/*" />
            <label htmlFor="file" id="file-label">
              <img id="preview" alt="Imagem padrão" />
            </label>
          </div>
          <h2 id="profileName"></h2>
          <small id="profileEmail"></small>
          <br />
          <form id="addbio">
            <input type="submit" value="ATUALIZAR FOTO" id="upbio" />
          </form>
        </div>
        <div className="posts"></div>
        <div className="Post">
          <div className="Picture"></div>
          <p id="conteudo">
          </p>
          <button id="like">❤️</button>
          <small id="likes"></small>
          <p id="close">X</p>
        </div>
      </div>
    </Body>
  );
}

export default ProfileUser;