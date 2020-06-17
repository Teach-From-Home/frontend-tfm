import axios from 'axios';
import { URL } from './URL'

export default class LoginService {

    async login(userToLog) {
        const result = await axios.post(`${URL}login`, userToLog);
        return result.data;
    }
}

