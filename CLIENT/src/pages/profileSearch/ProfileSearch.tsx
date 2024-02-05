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
          <Link to="/user">⚪</Link>
        </nav>

        <div className="profile">
          <div id="picture">
            <img id="preview" />
          </div>
          <h2 id="profileName"></h2>
          <p id="profileBio"></p>
          <br />
          <button id="seguir">seguir</button>
        </div>

        <div className="posts"></div>
        <div className="Post">
          <div className="Picture"></div>
          <p id="conteudo"></p>
          <button id="like">❤️</button>
          <small id="likes"></small>
          <p id="close">X</p>
        </div>
      </div>
    </Body>
  );
}

export default ProfileUser;
