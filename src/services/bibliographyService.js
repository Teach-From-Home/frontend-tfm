import axios from 'axios';
import { URL } from './URL'

export default class BibliographyService {

    async getBiblio(classroomId) {
        const result = await axios.get(`${URL}classroom/${classroomId}/bibliography`);
        return result.data;
    }

}

