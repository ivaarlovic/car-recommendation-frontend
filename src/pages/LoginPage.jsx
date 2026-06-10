import SurveyLogin from "../components/SurveyLogin";
import userStore from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    const user = await userStore.createSurveyUser(userData);

    userStore.user = user;

    navigate("/home");
  };

  return <SurveyLogin onLogin={handleLogin} />;
}

export default LoginPage;
