import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Post from "../../components/Post/Post";
import Paginate from "../../components/Paginate";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [posts]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2.5} sm={1.5} md={3.5}>
        <Box
          sx={{
            overflowX: { xs: "hidden" },
            overflowY: { xs: "hidden", lg: "scroll" },
            height: "calc(96vh - 64px)",
            "&::-webkit-scrollbar": { width: { xs: "2px", md: "6px" } },
            "&::-webkit-scrollbar-track": { background: "none" },
            "&::-webkit-scrollbar-thumb": { background: "#e3e3e3" },
          }}
        >
          <SideBar />
        </Box>
      </Grid>
      <Grid item xs={9.5} sm={10.5} md={8.5}>
        <Box
          sx={{
            overflowY: "scroll",
            paddingTop: "3vh",
            paddingLeft: "3vh",
            height: "calc(96.8vh - 64px)",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "none" },
            "&::-webkit-scrollbar-thumb": { background: "#e3e3e3" },
          }}
        >
          {loading ? (
            <Typography>
              <CircularProgress />
            </Typography>
          ) : (
            <div>
              {posts.map((post) => (
                <Grid key={post._id}>
                  <Post post={post} />
                </Grid>
              ))}
              <Paginate />
            </div>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
