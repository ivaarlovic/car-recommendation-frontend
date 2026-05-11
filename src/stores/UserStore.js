import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";

class UserStore {
  user = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async createSurveyUser(userData) {
    this.loading = true;

    try {
      const response = await api.post("/SurveyUser", userData);
      runInAction(() => {
        this.user = response.data;
      });
      localStorage.setItem("surveyUser", JSON.stringify(response.data));
      localStorage.setItem("loginTime", Date.now());
    } catch (error) {
      console.error("Greška pri dohvaćanju korisnika: ", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const userStore = new UserStore();

export default userStore;
