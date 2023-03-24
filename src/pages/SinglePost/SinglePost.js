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
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import { likePost, deletePost } from "../../actions/posts";

const SinglePost = () => {
  let ifLiked;
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = JSON.parse(localStorage.getItem("profileId"));

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  const handleLike = async () => {
    dispatch(likePost(post._id));
  };

  if (post?.likes != null) {
    ifLiked = post?.likes.includes(userId);
  }

  return (
    <>
      {post != null ? (
        <Container maxWidth="lg">
          <CardHeader
            avatar={
              <IconButton
                onClick={() => {
                  navigate(`/user/${userId}`);
                }}
              >
                <CardMedia
                  component="img"
                  height="50"
                  image={post?.creatorFiller?.userImage}
                  alt="profile picture"
                  sx={{ borderRadius: "30px" }}
                />
              </IconButton>
            }
            title={
              <ButtonBase>
                <Typography
                  variant="h6"
                  onClick={() => {
                    navigate(`/user/${userId}`);
                  }}
                >
                  {post?.name}
                </Typography>
              </ButtonBase>
            }
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
                <FavoriteIcon style={{ color: ifLiked ? "#ff0077" : "gray" }} />
              </IconButton>
              {post?.likes && <span>{post?.likes.length}</span>}

              {userId === post?.creator ? (
                <ButtonBase onClick={() => dispatch(deletePost(post._id))}>
                  <DeleteIcon style={{ color: "gray" }} />
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
