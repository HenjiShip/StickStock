import React, { useEffect, useState } from "react";
import { Button, AppBar, Typography, Toolbar, TextField } from "@mui/material";
import Stick from "../../images/Stick.png";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import noProfile from "../../images/noProfile.jpg";
import decode from "jwt-decode";
import { createUser, fetchUserId } from "../../actions/user";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.reload(false);
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    if (user?.result) {
      dispatch(createUser(user?.result));
    }
    if (user?.token) {
      dispatch(fetchUserId());
    }
  }, [dispatch, user]);

  return (
    <AppBar
      style={{
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "white",
        zIndex: "5",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to="/">
            <img src={Stick} alt="Stick Stock" className="Image" />
          </Link>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "black",
              textShadow: "-1px -0.5px #ff008c, 1px 0.5px #00e7ff",
            }}
          >
            <Link to="/">StickStock</Link>
          </Typography>
          <TextField
            name="search"
            placeholder="Search"
            variant="outlined"
            sx={{ marginLeft: "15px", display: { xs: "none", sm: "block" } }}
            size="small"
          />
          {user ? (
            <Button
              sx={{
                fontSize: { xs: "10px", md: "14px" },
                marginLeft: "auto",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "gray",
                  color: "white",
                },
              }}
              className="Button"
              onClick={() => navigate("/upload")}
            >
              <Link to="/upload">Upload</Link>
            </Button>
          ) : null}

          {user ? (
            <Button
              sx={{
                fontSize: { xs: "10px", md: "14px" },
                marginLeft: "10px",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "gray",
                  color: "white",
                },
              }}
              onClick={logout}
            >
              <img
                src={user?.result?.picture || noProfile}
                alt={user?.result?.name}
                referrerPolicy="no-referrer"
                style={{ height: "20px", borderRadius: "20px" }}
              />
              Log Out
            </Button>
          ) : (
            <Button
              sx={{
                marginLeft: "auto",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "gray",
                  color: "white",
                },
              }}
            >
              <Link to="/auth">Log In</Link>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
