import { useRef, useState } from "react";
import Body from "./Css";
import { useNavigate } from "react-router-dom";
import User from "../../models/user";
import axios from "axios";

const app = axios.create({
  baseURL: "http://localhost:10000",
});

function Search() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);

  const search = async () => {
    try {
      const nomeInput = nameRef.current;

      if (!nomeInput || nomeInput == null) {
        return;
      }

      const result = await app.get("/find/" + nomeInput.value);
      if (result.data.length === 0) {
        setUsers([{name: "NENHUM USUÁRIO ENCONTRADO", email: "nenhum"}]);
      } else {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changePage = async (profile: User) => {
    if (profile.email == "nenhum") {
      return;
    }
    const token = await app.post("/code", {profile});
    localStorage.setItem("search", token.data); 
    setTimeout(() => {
      navigate("/search/user");
    }, 100);
  }

    return(
        <Body>
          <div className="content">
            <form id="buscar">
              <input type="text" placeholder="Nome do usuário:" id="nome" onChange={search} ref={nameRef}/>
            </form>
            <div id="users">
            {users.map((user, index) => (
              <div key={index} className='user' onClick={()=>{changePage(user)}}>
                <img src={user.picture || 'https://icones.pro/wp-content/uploads/2021/02/icono-de-camara-gris.png'} alt={`Foto de ${user.name}`} />
                <p>{user.name}</p>
              </div>
            ))}
            </div>
          </div>
        </Body>
      );
}

export default Search;