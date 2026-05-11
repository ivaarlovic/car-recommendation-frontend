import SurveyLogin from "../components/SurveyLogin";
import userStore from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    await userStore.createSurveyUser(userData);

    navigate("/home");
  };

  return <SurveyLogin onLogin={handleLogin} />;
}

export default LoginPage;
