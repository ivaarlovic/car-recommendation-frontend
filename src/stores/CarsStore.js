import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";

class CarsStore {
  cars = [];
  loading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  async loadSurveyCars(surveyUserId) {
    if (!surveyUserId) {
      return;
    }

    this.loading = true;
    this.error = "";

    try {
      const response = await api.get(`/SurveyRating/cars/${surveyUserId}`);

      runInAction(() => {
        this.cars = response.data;
      });
    } catch (error) {
      console.error("Greška pri dohvaćanju automobila ankete:", error);

      runInAction(() => {
        this.cars = [];
        this.error =
          error.response?.data?.message ||
          error.response?.data ||
          "Automobile nije moguće učitati.";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  clearCars() {
    this.cars = [];
    this.error = "";
  }
}

const carsStore = new CarsStore();

export default carsStore;
