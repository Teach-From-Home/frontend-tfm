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

  async reUploadHomework(userId, homeworkId, hw) {
    await axios.put(`${URL}homework/${homeworkId}/user/${userId}`, hw);
  }

  async newHomework(homework, userId, classroomId) {
    const { title, description, available, deadLine, file } = homework;

    let hs = {
      title: title,
      description: description,
      available: available,
      deadLine: deadLine.format("DD/MM/yyyy"),
      file:file,
    }

    const result = await axios.post(`${URL}classroom/${classroomId}/homework/user/${userId}`, hs);
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

  async correctHomework(correction, userId, homeworkId){
    const result = await axios.put(`${URL}homework/${homeworkId}/student/${userId}/uploadCorrection`, correction);
    return result.data;
  }
}
