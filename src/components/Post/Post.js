import React from "react";
import {
  Box,
  IconButton,
  Divider,
  Grid,
  Typography,
  ButtonBase,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./index.css";
import { useNavigate } from "react-router-dom";
import noProfile from "../../images/noProfile.jpg";
import { useDispatch } from "react-redux";
import { likePost } from "../../actions/posts";

const borderRad = {
  borderRadius: "10px",
};

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    navigate(`/post/${post._id}`);
  };
  const handleUser = () => {
    navigate(`/user/${post.creator._id}`);
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));
  };

  return (
    <Box sx={{ maxWidth: "600px" }}>
      <Grid container>
        <Grid item xs={1.3}>
          <ButtonBase
            sx={{ width: "90%", borderRadius: "50px" }}
            onClick={handleUser}
          >
            <img
              src={noProfile}
              style={{ width: "80%", borderRadius: "50px" }}
            />
          </ButtonBase>
        </Grid>
        <Grid container item xs={7}>
          <Grid container direction="column" alignItems="flex-start">
            <ButtonBase sx={borderRad} onClick={handleUser}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {post.name}
              </Typography>
            </ButtonBase>
            <ButtonBase sx={borderRad} onClick={handleNavigate}>
              <Typography variant="h6">{post.title}</Typography>
            </ButtonBase>
          </Grid>
          <Grid container>
            <Typography variant="subtitle1">
              {post.message.slice(0, 75)}...
            </Typography>
            <Typography
              variant="subtitle1"
              color="gray"
              sx={{ marginLeft: "3px" }}
            >
              {post.tags.map((tag) => ` #${tag}`)}
            </Typography>
          </Grid>

          <Grid
            sx={{
              minHeight: "300px",
            }}
          >
            <ButtonBase sx={borderRad} onClick={handleNavigate}>
              <img
                src={
                  post.selectedFile ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                title={post.title}
                className="image"
                style={{ width: "100%" }}
              />
            </ButtonBase>
          </Grid>
        </Grid>
        <Grid
          item
          xs={1.5}
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
        >
          <IconButton onClick={handleLike} disabled={!user?.result}>
            <FavoriteIcon />
          </IconButton>
          <span>{post.likes.length}</span>
          <IconButton>
            <TextsmsIcon />
          </IconButton>
          <span>100</span>
          <IconButton>
            <BookmarkIcon />
          </IconButton>
          <span>100</span>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: "40px", marginTop: "40px" }} />
    </Box>
  );
};

export default Post;
