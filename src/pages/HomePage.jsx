import { observer } from "mobx-react-lite";
import carsStore from "../stores/CarsStore";
import CarCard from "../components/CarCard";
import { useEffect } from "react";

const HomePage = observer(() => {
  useEffect(() => {
    carsStore.loadCars();
  }, []);
  return (
    <>
      <h1 className="title">Anketa za preporuku automobila</h1>

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
