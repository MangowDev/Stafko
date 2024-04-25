import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login_components/Login";
import Register from "./components/login_components/Register";
import Home from "./components/home_components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername}/>
            )
          }
        />
        <Route path="/register" element={<Register username={username} setUsername={setUsername} />} />
        <Route path="/home" element={<Home username={username} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </Router>
  );
}

export default App;
