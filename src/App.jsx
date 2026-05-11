import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/app.css";
import GdprConsent from "./components/GdprConsent";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import { useState } from "react";

const checkLoginStatus = () => {
  const savedUser = localStorage.getItem("surveyUser");

  const loginTime = localStorage.getItem("loginTime");

  if (!savedUser || !loginTime) {
    return false;
  }

  const twoWeeks = 14 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  if (now - loginTime > twoWeeks) {
    localStorage.removeItem("surveyUser");
    localStorage.removeItem("loginTime");
    return false;
  }

  return true;
};

function App() {
  const [acceptedGdpr, setAcceptedGdpr] = useState(false);
  const [isLoggedIn] = useState(checkLoginStatus());

  const navigate = useNavigate();

  const handleAcceptGdpr = () => {
    setAcceptedGdpr(true);

    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  if (!acceptedGdpr) {
    return <GdprConsent onAccept={handleAcceptGdpr} />;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
