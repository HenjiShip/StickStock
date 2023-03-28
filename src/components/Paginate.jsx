import React, { useEffect } from "react";
import { Pagination, PaginationItem, Link } from "@mui/material";
import { styled } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      backgroundColor: "lightgray",
    },
    "&.Mui-selected": {
      backgroundColor: "#8afff1",
      "&:hover": {
        backgroundColor: "#40f9ff",
      },
    },
    "& .MuiPaginationItem-ellipsis": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiPaginationItem-ellipsis": {
    paddingTop: "25px",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

const Paginate = () => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const handlePageChange = (event, value) => {
    navigate(`/posts?page=${value}`);
  };

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);

  return (
    <StyledPagination
      count={numberOfPages}
      variant="outlined"
      page={Number(page)}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
      onChange={handlePageChange}
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    />
  );
};

export default Paginate;
