import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProfileUser from "./pages/profileUser/ProfileUser";
import ProfileSearch from "./pages/profileSearch/ProfileSearch";
import Enter from "./pages/enter/Enter";
import Search from "./pages/search/Search";
import Start from "./pages/start/Start";
import Post from "./pages/post/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enter" element={<Enter />}></Route>
        <Route path="/user" element={<ProfileUser />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search/user" element={<ProfileSearch />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
