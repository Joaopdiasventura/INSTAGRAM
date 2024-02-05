import { Link } from "react-router-dom";
import Body from "./Css";

function Start() {
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
        </div>
      </div>
    </Body>
  );
}

export default Start;
