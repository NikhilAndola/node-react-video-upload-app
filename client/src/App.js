import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignIn } from "./components/Form/SignIn/SignIn";
import { SignUp } from "./components/Form/SignUp/SignUp";
import { Upload } from "./components/upload/Upload";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
    </div>
  );
}

export default App;
