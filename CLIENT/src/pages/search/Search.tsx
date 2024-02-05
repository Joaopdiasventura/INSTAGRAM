import Body from "./Css";

function Search() {
    return(
        <Body>
          <div className="content">
            <form id="buscar">
              <input type="text" placeholder="Nome do usuário:" id="nome"/>
            </form>
            <div id="users"></div>
          </div>
        </Body>
      );
}

export default Search;