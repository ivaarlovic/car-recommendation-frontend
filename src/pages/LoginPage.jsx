import SurveyLogin from "../components/SurveyLogin";
import userStore from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      const user = await userStore.createSurveyUser(userData);

      if (user) {
        userStore.user = user;
        localStorage.setItem("surveyUser", JSON.stringify(user));
        localStorage.setItem("loginTime", Date.now().toString());

        setIsLoggedIn(true);
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Došlo je do pogreške prilikom prijave.");
    }
  };

  return <SurveyLogin onLogin={handleLogin} />;
}

export default LoginPage;
