import React from "react";
import FormComponent from "./Components/Form";
import { loadState } from "../../Config/storage";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const token = loadState("token");
  const navigate = useNavigate();
  if (token) {
    navigate("/app");
  }

  return (
    <div className="login">
      <div className="form">
        <FormComponent />
      </div>
    </div>
  );
};

export default Login;
