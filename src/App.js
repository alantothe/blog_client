import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";

import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CreatePost from "./components/CreatePost";
import SinglePost from "./components/SinglePost";
import EditPost from "./components/EditPost";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/create" element={<CreatePost />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/post/:id" element={<SinglePost />} />
        <Route path="/" element={<Navigate to="dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
