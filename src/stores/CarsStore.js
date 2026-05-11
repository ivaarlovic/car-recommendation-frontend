import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";

class CarsStore {
  cars = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadCars() {
    this.loading = true;

    try {
      const response = await api.get("/Car");

      runInAction(() => {
        this.cars = response.data;
      });
    } catch (error) {
      console.error("Greška pri dohvaćanju auta: ", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const carsStore = new CarsStore();
export default carsStore;
