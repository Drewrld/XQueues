import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("currentUser");

    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#100d1b",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontFamily: "Arial"
    }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;