// App.js or your route configuration file
import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import Login from "./Components/Login";
import Posts from "./Components/Posts";
import { useState } from "react";

const App = () => {
  //const [movieList, setMovieList] = useState([]);
  const [post, setPost] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route
        path="/components/Login"
        element={<Login post={post} setPost={setPost} />}
      />
      <Route path="/components/Posts" element={<Posts />} />
    </Routes>
  );
};

export default App;
