import { useState } from "react";

function SurveyLogin({ onLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!fullName || !email) {
      alert("Unesite ime i prezime.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email nije ispravan.");
      return;
    }

    onLogin({
      fullName,
      email,
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Sudjelovanje u anketi</h1>

        <p>Unesite svoje podatke kako biste mogli sudjelovati u anketi.</p>
        <input
          type="text"
          placeholder="Ime i prezime"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email adresa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>Nastavi</button>
      </div>
    </div>
  );
}

export default SurveyLogin;
