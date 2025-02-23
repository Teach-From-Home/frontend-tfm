import axios from 'axios';
import { URL } from './URL'

export default class ClassroomService {

    async getClassroom(userId) {
        const result = await axios.get(`${URL}user/${userId}/classrooms`);
        return result.data;
    }

    goLive(classroomId, userId){
        axios.post(`${URL}classroom/${classroomId}/user/${userId}/live`);
    }

    async getReport(classroomId, type){
        const result = await axios.get(`${URL}classroom/${classroomId}/report`,{
            params: {
                type
            }
          });
        return result.data;
    }
}