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

  return (
    <>
      <h1 className="title">Anketa za preporuku automobila</h1>

      <h2>Dobrodošao/la {user?.fullName}</h2>
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
