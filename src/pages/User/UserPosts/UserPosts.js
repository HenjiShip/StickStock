import React from "react";
import { ButtonBase, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserPosts = ({ upload }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/post/${upload._id}`);
  };

  return (
    <ButtonBase onClick={handleNavigate}>
      <Grid item sx={{ textAlign: "left" }}>
        <div style={{ height: "300px", width: "200px" }}>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "20px" }}
            src={upload.selectedFile}
          />
        </div>
        <Typography variant="subtitle1">{upload.title}</Typography>
      </Grid>
    </ButtonBase>
  );
};

export default UserPosts;
