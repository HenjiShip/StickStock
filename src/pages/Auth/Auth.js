import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleSuccess = (res) => {
    try {
      const result = jwt_decode(res.credential);
      const token = res.credential;
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google signin unsuccessful");
  };
  return (
    <Container maxWidth="sm">
      <GoogleLogin onSuccess={googleSuccess} onFailur={googleFailure} />
    </Container>
  );
};

export default Auth;
