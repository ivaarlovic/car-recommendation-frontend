import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./styles/app.css";

import GdprConsent from "./components/GdprConsent";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SurveyCompletedPage from "./components/SurveyCompletePage";

function App() {
  const [acceptedGdpr, setAcceptedGdpr] = useState(
    () => localStorage.getItem("gdprAccepted") === "true",
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Provjera da li je korisnik ulogiran
  useEffect(() => {
    const savedUser = localStorage.getItem("surveyUser");
    const loginTime = localStorage.getItem("loginTime");

    if (savedUser && loginTime) {
      const twoWeeks = 14 * 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(loginTime) < twoWeeks) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleAcceptGdpr = () => {
    localStorage.setItem("gdprAccepted", "true");
    setAcceptedGdpr(true);
  };

  if (!acceptedGdpr) {
    return <GdprConsent onAccept={handleAcceptGdpr} />;
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route path="/survey-completed" element={<SurveyCompletedPage />} />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
