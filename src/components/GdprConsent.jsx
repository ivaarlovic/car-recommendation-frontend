import { useState } from "react";

function GdprConsent({ onAccept }) {
  const studentEmail = "iva.arlovic03@gmail.com";
  const [consentChecked, setConsentChecked] = useState(false);

  return (
    <div className="gdpr-container">
      <div className="gdpr-box">
        <h1>Anketa za preporuku automobila</h1>

        <h2>Privola za obradu osobnih podataka</h2>

        <p>
          Ova privola je u potpunosti u skladu s Općom uredbom o zaštiti
          podataka (GDPR). Podatke prikuplja i obrađuje:{" "}
          <strong>Iva Arlović</strong> (student/ica).
        </p>

        <p>Prikupljaju se sljedeći podaci: </p>

        <ul>
          <li>Ime i prezime</li>
          <li>Email adresa</li>
          <li>Ocjene automobila</li>
          <li>Interakcije unutar aplikacije</li>
        </ul>

        <p>
          <strong>Svrha:</strong> Podaci se koriste isključivo za potrebe izrade
          diplomskog rada i analize sustava preporuke. Podaci neće biti javno
          dostupni niti dijeljeni trećim stranama.
        </p>
        <p>
          <strong>Rok čuvanja:</strong> Vaši podaci bit će pohranjeni do
          završetka obrane diplomskog rada, nakon čega će biti trajno obrisani.
        </p>

        <p>
          <strong>Opoziv privole:</strong> Svoju privolu možete u bilo kojem
          trenutku povući slanjem zahtjeva na email adresu:
          <a href={`mailto:${studentEmail}`}> {studentEmail}</a>.
        </p>
        <label className="gdpr-checkbox">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
          />
          Potvrđujem da sam pročitao/la privolu i pristajem na obradu osobnih
          podataka za potrebe ovog istraživanja.
        </label>
        <button onClick={onAccept} disabled={!consentChecked}>
          Nastavi
        </button>
      </div>
    </div>
  );
}

export default GdprConsent;
