import axios from 'axios';
import { URL } from './URL'

export default class HomeworkService {

    async getHomework(userId, classroomId) {
        const result = await axios.get(`${URL}classroom/${classroomId}/homework/${userId}`, );
        return result.data;
    }

    async newHomework(homework, userId, classroomId){
        const result = await axios.post(`${URL}classroom/${classroomId}/homework/user/${userId}`, homework);
        return result.data;
    }
}

