import { useState } from "react";
import ratingsStore from "../stores/RatingsStore";
import api from "../services/api";

function CarCard({ car }) {
  const [showDetails, setShowDetails] = useState(false);
  const [rating, setRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendRating = async () => {
    const user = JSON.parse(localStorage.getItem("surveyUser"));
    if (!user) {
      alert("Korisnik nije prijavljen");
      return;
    }

    const ratingData = {
      surveyUserId: user.id,
      carId: car.id,
      score: Number(rating),
    };

    await ratingsStore.sendRating(ratingData);

    setIsSubmitted(true);
  };

  const sendCarView = async () => {
    const user = JSON.parse(localStorage.getItem("surveyUser"));
    if (!user) return;

    try {
      await api.post("/CarView", {
        surveyUserId: user.id,
        carId: car.id,
      });
    } catch (error) {
      console.error("Greska kod spremanja pregleda auta: ", error);
    }
  };

  return (
    <div className="car-card">
      {car.imageUrl && (
        <img
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="car-image"
        />
      )}
      <div className="car-content">
        <h2>
          {car.brand} {car.model}
        </h2>
        <p>
          <strong>Godina: </strong>
          {car.year}
        </p>
        <p>
          <strong>Cijena: </strong>
          {car.price}€
        </p>
        <p>
          <strong>Gorivo:</strong> {car.fuelType}
        </p>

        <p>
          <strong>Motor:</strong> {car.engine}
        </p>

        <p>
          <strong>Karoserija:</strong> {car.bodyType}
        </p>

        <button
          onClick={() => {
            setShowDetails(!showDetails);
            if (!showDetails) {
              sendCarView();
            }
          }}
        >
          {showDetails ? "Sakrij detalje" : "Prikaži detalje"}
        </button>

        {showDetails && (
          <div className="details">
            <p>
              <strong>Konjske snage:</strong> {car.horsePower}
            </p>

            <p>
              <strong>Boja:</strong> {car.color}
            </p>

            <p>
              <strong>Mjenjač:</strong> {car.transmission}
            </p>
            <p>
              <strong>Kilometraža: </strong> {car.mileage} km
            </p>
            <p>
              <strong>Opis:</strong> {car.description}
            </p>
          </div>
        )}

        <div className="reating-section">
          <p className="rating-title">
            Koliko je vjerojatno da biste kupili ovaj automobil?
          </p>

          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="slider"
          />

          <p className="rating-value">Odabrana vrijednost: {rating}</p>

          <button
            onClick={sendRating}
            disabled={isSubmitted}
            className={isSubmitted ? "submitted-button" : ""}
          >
            {isSubmitted ? "✓ Odgovor poslan" : "Pošalji odgovor"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
