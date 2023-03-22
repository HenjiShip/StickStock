import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLikedPosts, getUserPosts } from "../../actions/posts";
import { Grid, Typography } from "@mui/material";
import LikedPost from "./LikedPost/LikedPost";
import UserPosts from "./UserPosts/UserPosts";
import { Container } from "@mui/system";
import { fetchUser } from "../../actions/user";

const User = () => {
  const dispatch = useDispatch();
  const { liked, uploads } = useSelector((state) => state.posts);
  const { userInfo } = useSelector((state) => state.auth);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getLikedPosts(userId));
    dispatch(fetchUser(userId));
    dispatch(getUserPosts(userId));
  }, [userId]);

  return (
    <Container maxWidth="lg">
      <Typography>{userInfo?.name}</Typography>

      {liked?.posts !== undefined ? (
        <Grid container spacing={3} justifyContent="center">
          {liked.posts.map((post) => (
            <Grid item key={post._id}>
              <LikedPost post={post}></LikedPost>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>...Loading </Typography>
      )}
      {uploads.map((upload) => (
        <UserPosts key={upload._id} upload={upload}></UserPosts>
      ))}
    </Container>
  );
};

export default User;