import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/facebook";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login with Facebook</h2>
      <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Login with Facebook
      </button>
    </div>
  );
};

export default Login;
