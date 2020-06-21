import axios from "axios";
import { URL } from "./URL";

export default class HomeworkService {
  async getHomework(userId, classroomId) {
    const result = await axios.get(
      `${URL}classroom/${classroomId}/homework/${userId}`
    );
    return result.data;
  }

  async getHomeworkUploaded(userId, classroomId) {
    const result = await axios.get(
      `${URL}classroom/${classroomId}/homeworkuploaded/${userId}`
    );
    return result.data;
  }

  async uploadHomework(userId, homeworkId, hw) {
    await axios.post(`${URL}homework/${homeworkId}/user/${userId}`, hw);
  }

  async newHomework(homework, userId, classroomId) {
    const result = await axios.post(
      `${URL}classroom/${classroomId}/homework/user/${userId}`,
      homework
    );
    return result.data;
  }

  async getStudentsHomework(homeworkId, userId) {
    const result = await axios.get(`${URL}homework/${homeworkId}/uploaded/${userId}`);
    return result.data;
  }

  async modifyHomework(homework, homeworkId){
    const result = await axios.put(`${URL}homework/${homeworkId}`, homework);
    return result.data;
  }
}
