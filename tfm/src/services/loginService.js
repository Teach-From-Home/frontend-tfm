import axios from "axios";
import { URL } from "./URL";

export default class LoginService {
  async login(userToLog) {
    const result = await axios.post(`${URL}login`, userToLog);
    sessionStorage.setItem("session", JSON.stringify(result.data));
    console.log(result.data);
    return result.data;
  }
  
  logout() {
    sessionStorage.clear();
  }
}
