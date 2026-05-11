function GdprConsent({ onAccept }) {
  return (
    <div className="gdpr-container">
      <div className="gdpr-box">
        <h1>Anketa za preporuku automobila</h1>

        <h2>Privola za korištenje podataka</h2>

        <p>
          Ova anketa provodi se u svrhu izrade diplomskog rada iz područja
          sustava preporuke automobila.{" "}
        </p>

        <p>Prikupljaju se sljedeći podaci: </p>

        <ul>
          <li>Ime i prezime</li>
          <li>Email adresa</li>
          <li>Ocjene automobila</li>
          <li>Interakcije unutar aplikacije</li>
        </ul>

        <p>
          Podaci će se koristiti isključivo za potrebe diplomskog rada i analize
          sustava preporuke
        </p>
        <p>Podaci neće biti javno dostupni niti dijeljeni trećim stranama.</p>

        <p>
          Ispunjavanjem ankete pristajete na korištenje podataka u svrhu
          diplomskog rada.
        </p>
        <button onClick={onAccept}>Prihvaćam i želim nastaviti</button>
      </div>
    </div>
  );
}

export default GdprConsent;
