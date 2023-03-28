import React, { useEffect, useState } from "react";
import {
  Button,
  AppBar,
  Typography,
  Toolbar,
  TextField,
  Menu,
  MenuItem,
  ButtonBase,
  Grid,
} from "@mui/material";
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
  const userId = JSON.parse(localStorage.getItem("profileId"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // menu code
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Grid container justifyContent="center">
            <TextField
              name="search"
              placeholder="Search"
              variant="outlined"
              sx={{ marginLeft: "15px", display: { xs: "none", sm: "block" } }}
              size="small"
            />
          </Grid>
          {user ? (
            <Button
              sx={{
                fontSize: { xs: "10px", md: "14px" },
                marginLeft: "auto",
                width: "150px",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #d9d9d9",
                borderRadius: "0",
                "&:hover": {
                  backgroundColor: "#dedede",
                },
              }}
              onClick={() => navigate("/upload")}
            >
              <Link to="/upload">+ Upload</Link>
            </Button>
          ) : null}

          {user ? (
            <div>
              <ButtonBase
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ marginLeft: "50px" }}
              >
                <img
                  src={user?.result?.picture || noProfile}
                  alt={user?.result?.name}
                  referrerPolicy="no-referrer"
                  style={{ height: "40px", borderRadius: "20px" }}
                />
              </ButtonBase>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate(`/user/${userId}`);
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            // <Button
            //   sx={{
            //     fontSize: { xs: "10px", md: "14px" },
            //     marginLeft: "10px",
            //     backgroundColor: "black",
            //     color: "white",
            //     "&:hover": {
            //       backgroundColor: "gray",
            //       color: "white",
            //     },
            //   }}
            //   onClick={logout}
            // >
            //   <img
            //     src={user?.result?.picture || noProfile}
            //     alt={user?.result?.name}
            //     referrerPolicy="no-referrer"
            //     style={{ height: "20px", borderRadius: "20px" }}
            //   />
            //   Log Out
            // </Button>
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
