import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Grid,
  Divider,
  Typography,
} from "@mui/material";
import { Mail, Inbox } from "@mui/icons-material";
import noProfile from "../../images/noProfile.jpg";
import { borderRight, maxWidth } from "@mui/system";

const SideBar = () => {
  const menuItems = [
    {
      id: 1,
      text: "For you (soon)",
      icon: <Inbox />,
    },
    {
      id: 2,
      text: "Following (soon)",
      icon: <Mail />,
    },
  ];
  const following = [
    {
      id: 1,
      text: "person 1",
      icon: noProfile,
    },
    {
      id: 2,
      text: "person 2",
      icon: noProfile,
    },
    {
      id: 3,
      text: "person 3",
      icon: noProfile,
    },
    {
      id: 4,
      text: "person 4",
      icon: noProfile,
    },
  ];

  return (
    <List>
      <Box
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton key={item.id}>
            <Toolbar>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </Toolbar>
          </ListItemButton>
        ))}
        <Divider />
        <Typography
          variant="subtitle2"
          sx={{ paddingLeft: "40px", paddingTop: "20px" }}
        >
          Suggested Accounts
        </Typography>
        {following.map((item) => (
          <ListItemButton key={item.id}>
            <Toolbar>
              <img
                src={item.icon}
                style={{ width: "25px", borderRadius: "20px" }}
              ></img>
              <ListItemText primary={item.text} />
            </Toolbar>
          </ListItemButton>
        ))}
        <Divider />
        <Typography
          variant="subtitle2"
          sx={{ paddingLeft: "40px", paddingTop: "20px" }}
        >
          Following
        </Typography>
        {following.map((item) => (
          <ListItemButton key={item.id}>
            <Toolbar>
              <img
                src={item.icon}
                style={{ width: "25px", borderRadius: "20px" }}
              ></img>
              <ListItemText primary={item.text} />
            </Toolbar>
          </ListItemButton>
        ))}
        <Divider />
        <Typography
          variant="subtitle2"
          sx={{ paddingLeft: "40px", paddingTop: "20px" }}
        >
          Discover
        </Typography>
        {following.map((item) => (
          <ListItemButton key={item.id}>
            <Toolbar>
              <img
                src={item.icon}
                style={{ width: "25px", borderRadius: "20px" }}
              ></img>
              <ListItemText primary={item.text} />
            </Toolbar>
          </ListItemButton>
        ))}
        <Divider />
        <Typography variant="subtitle1" sx={{ color: "gray", padding: "20px" }}>
          © 2023 TikTok
        </Typography>
      </Box>

      <Box
        sx={{
          height: { xs: "100vh", lg: "auto" },
          maxWidth: "60px",
          borderRight: { xs: "1px solid #e3e3e3", lg: "none" },
          boxShadow: "0 1px ",
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            sx={{
              display: {
                xs: "block",
                lg: "none",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
          </ListItemButton>
        ))}
      </Box>
    </List>
  );
};

export default SideBar;
