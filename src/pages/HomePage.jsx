import { observer } from "mobx-react-lite";
import carsStore from "../stores/CarsStore";
import CarCard from "../components/CarCard";
import { useEffect, useState } from "react";
import ratingsStore from "../stores/RatingsStore";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const HomePage = observer(() => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("surveyUser"));
    setUser(u);
  }, []);

  useEffect(() => {
    carsStore.loadCars();
  }, []);

  useEffect(() => {
    if (user) {
      ratingsStore.fetchUserRatings(user.id);
    }
  }, [user]);

  const ratings = ratingsStore.ratings ?? [];
  const cars = carsStore.cars ?? [];

  const totalCars = cars.length;

  const ratedCarsCount = user
    ? ratings.filter((r) => r.surveyUserId === user.id).length
    : 0;

  const progressPercentage =
    totalCars > 0 ? (ratedCarsCount / totalCars) * 100 : 0;

  const minimumRatingsRequired = 15;
  const hasEnoughRatings = ratedCarsCount >= minimumRatingsRequired;

  const handleFinishSurvey = async () => {
    if (!user) return;

    if (hasEnoughRatings) {
      await api.post(`/SurveyUser/${user.id}/complete`);
      localStorage.removeItem("surveyUser");
      localStorage.removeItem("loginTime");

      navigate("/survey-completed");
    } else {
      alert(
        `Morate ocijeniti još ${minimumRatingsRequired - ratedCarsCount} automobila kako biste završili anketu.`,
      );
    }
  };

  console.log("Cars: ", carsStore.cars);
  console.log("Loading: ", carsStore.loading);

  return (
    <>
      <h1 className="title">Anketa za preporuku automobila</h1>

      <h2>Dobrodošao/la {user?.fullName}</h2>
      <div className="progress-container">
        <p className="progress-text">
          Ocijenili ste {ratedCarsCount} / {totalCars} automobila.
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {!hasEnoughRatings && (
          <p className="minimum-ratings-warning">
            Molimo ocijenite bar {minimumRatingsRequired} automobila kako bi
            recommendation sustav imao dovoljno podataka.
          </p>
        )}
      </div>
      <p className="subtitle">
        Pregledajte automobile i označite koliko biste ih vjerojatno kupili.
      </p>

      {carsStore.loading ? (
        <p>Učitavanje...</p>
      ) : (
        <div className="cars-grid">
          {carsStore.cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      <div className="finish-survey-container">
        <p className="finish-survey-text">
          Nakon što ocijenite dovoljan broj automobila, kliknite na gumb ispod
          kako biste završili anketu.
        </p>
        <button className="finish-survey-btn" onClick={handleFinishSurvey}>
          Završi anketu
        </button>
      </div>
    </>
  );
});

export default HomePage;
