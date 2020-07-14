import axios from 'axios';
import { URL } from './URL'

export default class BibliographyService {

    async getBiblio(classroomId) {
        const result = await axios.get(`${URL}classroom/${classroomId}/bibliography`);
        return result.data;
    }

    async updateBiblio(classroomId,item) {
        await axios.put(`${URL}classroom/${classroomId}/bibliography/${item.id}`,item);
    }

    async createBiblio(classroomId,item) {
        await axios.post(`${URL}classroom/${classroomId}/bibliography`,item);
    }

    async removeBiblio(classroomId,itemId) {
        await axios.delete(`${URL}classroom/${classroomId}/bibliography/${itemId}`);
    }


}

