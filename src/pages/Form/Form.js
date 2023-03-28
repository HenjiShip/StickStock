import React, { useEffect } from "react";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import uploadImage from "../../images/uploadImage.jpg";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postToUpdate } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [imagePreview, setImagePreview] = useState(uploadImage);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPostData({ ...postData, selectedFile: reader.result });
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPostData({ ...postData, selectedFile: null });
      setImagePreview(uploadImage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postToUpdate) {
      dispatch(updatePost(postToUpdate._id, postData));
      navigate("/");
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  };

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
    if (postToUpdate) {
      setPostData({
        ...postData,
        title: postToUpdate?.title,
        message: postToUpdate?.message,
        tags: postToUpdate?.tags.join(", "),
        selectedFile: postToUpdate?.selectedFile,
        likes: postToUpdate?.likes,
        creator: postToUpdate?.creator,
      });
    }
  }, [postToUpdate]);

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ padding: "20px" }}>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h6">
              {postToUpdate ? "Edit" : "Upload"} Post
            </Typography>

            <Typography variant="subtitle1" sx={{ color: "gray" }}>
              Post a photo to your account
            </Typography>
            {postToUpdate?.selectedFile ? (
              <img
                src={postToUpdate?.selectedFile}
                alt="upload preview"
                style={{ maxWidth: "90%" }}
              />
            ) : (
              imagePreview && (
                <img
                  src={imagePreview}
                  alt="upload preview"
                  style={{ maxWidth: "90%" }}
                />
              )
            )}
          </Grid>
          <Grid item xs={8} sx={{ paddingTop: "40px" }}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Typography variant="subtitle1">Title</Typography>
              <TextField
                hiddenLabel
                placeholder="Title"
                name="title"
                size="small"
                fullWidth
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                sx={{ marginBottom: "20px" }}
              />
              <Typography>Description</Typography>
              <TextField
                hiddenLabel
                name="message"
                size="small"
                multiline
                rows={3}
                placeholder="Description..."
                fullWidth
                value={postData.message}
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
                sx={{ marginBottom: "20px" }}
              />
              <Typography>Tags</Typography>
              <TextField
                hiddenLabel
                name="tags"
                placeholder="Tags,Mango,Peach"
                fullWidth
                size="small"
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",") })
                }
                sx={{ marginBottom: "20px" }}
              />
              {postToUpdate ? null : (
                <div className="input-file" style={{ marginBottom: "20px" }}>
                  <input type="file" onChange={handleFileInputChange} />
                </div>
              )}

              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  backgroundColor: "#fc036f",
                  "&:hover": {
                    backgroundColor: "#ff4d9a",
                  },
                }}
              >
                Upload
              </Button>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Form;
