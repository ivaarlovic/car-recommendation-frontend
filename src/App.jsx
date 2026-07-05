import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./styles/app.css";

import GdprConsent from "./components/GdprConsent";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SurveyCompletedPage from "./components/SurveyCompletePage";

function App() {
  const [acceptedGdpr, setAcceptedGdpr] = useState(() => {
    return localStorage.getItem("gdprAccepted") === "true";
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Provjera login statusa
  useEffect(() => {
    const checkLogin = () => {
      const savedUser = localStorage.getItem("surveyUser");
      const loginTime = localStorage.getItem("loginTime");

      if (!savedUser || !loginTime) {
        setIsLoggedIn(false);
        return false;
      }

      const twoWeeks = 14 * 24 * 60 * 60 * 1000;
      const now = Date.now();

      if (now - parseInt(loginTime) > twoWeeks) {
        localStorage.removeItem("surveyUser");
        localStorage.removeItem("loginTime");
        setIsLoggedIn(false);
        return false;
      }

      setIsLoggedIn(true);
      return true;
    };

    checkLogin();
  }, []);

  const handleAcceptGdpr = () => {
    localStorage.setItem("gdprAccepted", "true");
    setAcceptedGdpr(true);
  };

  // Ako nije prihvatio GDPR → prikaži samo njega
  if (!acceptedGdpr) {
    return <GdprConsent onAccept={handleAcceptGdpr} />;
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/home" />}
        />

        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route path="/survey-completed" element={<SurveyCompletedPage />} />

        {/* Default ruta */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
