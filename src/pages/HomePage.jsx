import { observer } from "mobx-react-lite";
import carsStore from "../stores/CarsStore";
import CarCard from "../components/CarCard";
import { useEffect, useState } from "react";
import ratingsStore from "../stores/RatingsStore";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import userStore from "../stores/UserStore";
import ScrollToTop from "../components/ScrollToTop";

const HomePage = observer(() => {
  const navigate = useNavigate();
  const user = userStore.user;

  useEffect(() => {
    if (user?.id) {
      carsStore.loadSurveyCars(user.id);
    }
  }, [user?.id]);
  useEffect(() => {
    if (user) {
      ratingsStore.fetchUserRatings(user.id);
    }
  }, [user]);

  const ratings = ratingsStore.ratings ?? [];
  const cars = carsStore.cars ?? [];

  const totalCars = cars.length;

  const assignedCarIds = new Set(cars.map((car) => car.id));

  const ratedCarsCount = user
    ? ratings.filter(
        (rating) =>
          rating.surveyUserId === user.id && assignedCarIds.has(rating.carId),
      ).length
    : 0;

  const progressPercentage =
    totalCars > 0 ? (ratedCarsCount / totalCars) * 100 : 0;

  const minimumRatingsRequired = 30;

  const hasEnoughRatings = totalCars === 30 && ratedCarsCount === 30;
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

  useEffect(() => {
    const header = document.querySelector(".sticky-header");

    const handleScroll = () => {
      if (window.scrollY > 120) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="sticky-header">
        <h1 className="title">Anketa za preporuku automobila</h1>
        <h2>Dobrodošao/la {user?.fullName}</h2>
        <div className="progress-container">
          <p className="progress-text">
            Ocijenili ste{" "}
            <strong>
              {ratedCarsCount} / {totalCars}
            </strong>{" "}
            automobila.
          </p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {!hasEnoughRatings && (
            <p className="minimum-ratings-warning">
              Molimo ocijenite svih 30 automobila kako biste mogli završiti
              anketu.
            </p>
          )}
        </div>
      </div>
      <div className="main-content">
        <p className="subtitle">
          Pregledajte automobile i označite koliko biste ih vjerojatno kupili.
        </p>

        {carsStore.loading ? (
          <p>Učitavanje...</p>
        ) : (
          <div className="cars-grid">
            {carsStore.cars.map((car) => (
              <CarCard key={car.id} car={car} user={user} />
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

        <ScrollToTop />
      </div>
    </>
  );
});

export default HomePage;
