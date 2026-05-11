import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";

class RatingsStore {
  loading = false;
  ratings = [];

  constructor() {
    makeAutoObservable(this);
  }

  async sendRating(ratingData) {
    this.loading = true;

    try {
      await api.post("/SurveyRating", ratingData);
    } catch (error) {
      console.error("Greška pri spremanju ocjene: ", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchUserRatings(userId) {
    this.loading = true;

    try {
      const response = await api.get(`/SurveyRating/user/${userId}`);

      runInAction(() => {
        this.ratings = response.data;
      });
    } catch (error) {
      console.error("Greska kod dohvaćanja ocjena: ", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const ratingsStore = new RatingsStore();

export default ratingsStore;
