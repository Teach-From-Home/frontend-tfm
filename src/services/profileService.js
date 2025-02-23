import axios from 'axios';
import { URL } from './URL'

export default class ProfileService {

    async getProfile(userId) {
        const result = await axios.get(`${URL}user/${userId}`);
        return result.data;
    }

    async getCalendar(userId){
        const result = await axios.get(`${URL}user/${userId}/calendar`);
        return result.data;
    }

    async editProfile(profile){
        let userId = profile.id;

        const result = await axios.put(`${URL}user/${userId}`, profile);
        return result.data;
    }
}

