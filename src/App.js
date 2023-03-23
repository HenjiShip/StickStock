import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import SinglePost from "./pages/SinglePost/SinglePost";
import User from "./pages/User/User";
import "./index.css";
import Auth from "./pages/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
      >
        <Container maxWidth="lg" sx={{ margin: "auto", padding: { xs: 0 } }}>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/upload" exact element={<Form />} />
            <Route path="/auth" exact element={<Auth />} />
            <Route path="/post/:id" exact element={<SinglePost />} />
            <Route path="/user/:creator" exact element={<User />} />
          </Routes>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
