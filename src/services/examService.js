import axios from "axios";
import { URL } from "./URL";

export default class ExamService {

  async newExam(exam, classroomId) {

    const { title, description, available, deadLine, minutes, questions } = exam;

    let ex = {
        title: title,
        description: description,
        available: available,
        deadLine: deadLine.format("DD/MM/yyyy"),
        minutes: minutes,
        questions: questions
    }

    const result = await axios.post(
      `${URL}classroom/${classroomId}/exam`,
      ex
    );

    return result.data;
  }

  async getExam(userId, classroomId) {
    const result = await axios.get(
      `${URL}classroom/${classroomId}/user/${userId}/exams`
    );
    return result.data;
  }

  async editExam(exam){
    let dL = exam.deadLine.format("DD/MM/yyyy");

    let ex = {
      ...exam,
      deadLine: dL
    }

    const result = await axios.put(
      `${URL}exam`,
      ex
    );
    return result.data;
  }

  async postExam(examId, userId, questions){

    let qs = {
      questions: questions
    }

    const result = await axios.put(`${URL}exam/${examId}/user/${userId}`, qs);
    return result.data
  }

  startExam(examId, userId){
    axios.post(`${URL}exam/${examId}/user/${userId}`);
  }

  async getStudentsExams(examId){
    const result = await axios.get(`${URL}exam/${examId}`);
    return result.data;
  }

  async correctExam(correction, userId, examId){
    const result = await axios.post(`${URL}exam/${examId}/user/${userId}/comment`, correction);
    return result.data;
  }
}
