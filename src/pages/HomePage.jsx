import { observer } from "mobx-react-lite";
import carsStore from "../stores/CarsStore";
import CarCard from "../components/CarCard";
import { useEffect } from "react";
import ratingsStore from "../stores/RatingsStore";

const HomePage = observer(() => {
  useEffect(() => {
    carsStore.loadCars();

    const user = JSON.parse(localStorage.getItem("surveyUser"));

    if (user) {
      ratingsStore.fetchUserRatings(user.id);
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("surveyUser"));
  const ratings = ratingsStore.ratings;

  const totalCars = carsStore.cars.length;
  const ratedCarsCount = ratings.filter(
    (r) => r.surveyUserId === user?.id,
  ).length;

  const progressPercentage =
    totalCars > 0 ? (ratedCarsCount / totalCars) * 100 : 0;

  const minimumRatingsRequired = 15;
  const hasEnoughRatings = ratedCarsCount >= minimumRatingsRequired;
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
    </>
  );
});

export default HomePage;
