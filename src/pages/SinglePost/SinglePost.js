import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../actions/posts";
import {
  Box,
  ButtonBase,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import noProfile from "../../images/noProfile.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import { likePost, deletePost } from "../../actions/posts";

const SinglePost = () => {
  const { post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = JSON.parse(localStorage.getItem("profileId"));

  console.log(post);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  const handleLike = async () => {
    dispatch(likePost(post._id));
  };

  return (
    <>
      {post != null ? (
        <Container maxWidth="lg">
          <CardHeader
            avatar={
              <IconButton>
                <CardMedia
                  component="img"
                  height="50"
                  image={noProfile}
                  alt="profile picture"
                  sx={{ borderRadius: "30px" }}
                />
              </IconButton>
            }
            title={post?.name}
            subheader={moment(post?.createdAt).fromNow()}
          />
          <Grid container>
            <Grid item xs={11} md={6}>
              <Typography variant="h5">{post.title}</Typography>
              <CardMedia
                component="img"
                height="auto"
                image={post?.selectedFile}
                sx={{ borderRadius: "20px" }}
              />
              <Box sx={{ padding: "10px" }}>
                <Typography variant="subtitle1">{post?.message}</Typography>
              </Box>
              <Box sx={{ padding: "10px" }}>
                {post?.tags && (
                  <Typography variant="subtitle1" sx={{ color: "gray" }}>
                    {post?.tags.map((tag) => ` #${tag}`)}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={0.5}
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <IconButton disabled={!user?.result} onClick={handleLike}>
                <FavoriteIcon />
              </IconButton>
              {post?.likes && <span>{post?.likes.length}</span>}

              {userId === post.creator._id ? (
                <ButtonBase onClick={() => dispatch(deletePost(post._id))}>
                  Delete
                </ButtonBase>
              ) : null}
            </Grid>
            <Grid item xs={1} md={6}></Grid>
          </Grid>
        </Container>
      ) : (
        <Typography variant="h3">
          Oops, the page you're looking for doesn't exist
        </Typography>
      )}
    </>
  );
};

export default SinglePost;
