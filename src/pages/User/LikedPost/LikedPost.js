import React from "react";
import { ButtonBase, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LikedPost = ({ post }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <ButtonBase onClick={handleNavigate}>
      <Grid>
        <div style={{ height: "300px", width: "200px" }}>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "20px" }}
            src={post.selectedFile}
          />
        </div>
        <Typography variant="subtitle1">{post.title}</Typography>
      </Grid>
    </ButtonBase>
  );
};

export default LikedPost;
