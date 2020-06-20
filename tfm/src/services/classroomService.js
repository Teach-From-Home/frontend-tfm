import axios from 'axios';
import { URL } from './URL'

export default class ClassroomService {

    async getClassroom(userId) {
        const result = await axios.get(`${URL}user/${userId}/classrooms`);
        return result.data;
    }

    async goLive(classroomId){
        const result = await axios.post(`${URL}classroom/${classroomId}/live`);
        return result.data;
    }
}