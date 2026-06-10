import { useState, useEffect } from "react";
import ratingsStore from "../stores/RatingsStore";
import api from "../services/api";
import { observer } from "mobx-react-lite";

const CarCard = observer(({ car, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [rating, setRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // sync rating from store
  useEffect(() => {
    if (!user || !ratingsStore.ratings?.length) return;

    const existingRating = ratingsStore.ratings.find(
      (r) => r.surveyUserId === user.id && r.carId === car.id,
    );

    if (existingRating) {
      setRating(Number(existingRating.score));
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  }, [user, car.id, ratingsStore.ratings]);

  const sendRating = async () => {
    if (!user) return;

    const ratingData = {
      surveyUserId: user.id,
      carId: car.id,
      score: Number(rating),
    };

    await ratingsStore.sendRating(ratingData);
    await ratingsStore.fetchUserRatings(user.id);

    setIsSubmitted(true);
  };

  const sendCarView = async () => {
    if (!user) return;

    try {
      await api.post("/CarView", {
        surveyUserId: user.id,
        carId: car.id,
      });
    } catch (error) {
      console.error("Greška kod spremanja pregleda auta:", error);
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
          <strong>Godina:</strong> {car.year}
        </p>
        <p>
          <strong>Cijena:</strong> {car.price}€
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
            const next = !showDetails;
            setShowDetails(next);

            if (next) sendCarView();
          }}
        >
          Prikaži detalje
        </button>

        {showDetails && (
          <div className="modal-overlay" onClick={() => setShowDetails(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {car.imageUrl && (
                <img
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  className="modal-image"
                />
              )}

              <button
                className="close-button"
                onClick={() => setShowDetails(false)}
              >
                ✕
              </button>

              <h2>
                {car.brand} {car.model}
              </h2>

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
                <strong>Kilometraža:</strong> {car.mileage} km
              </p>
              <p>
                <strong>Opis:</strong> {car.description}
              </p>
            </div>
          </div>
        )}

        <div className="rating-section">
          <p className="rating-title">
            Koliko je vjerojatno da biste kupili ovaj automobil?
          </p>

          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => {
              setRating(Number(e.target.value));
              setIsSubmitted(false);
            }}
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
});

export default CarCard;
