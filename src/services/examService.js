import axios from "axios";
import { URL } from "./URL";

export default class ExamService {

  async newExam(exam, classroomId) {

    const { title, description, available, deadLine, questions } = exam;

    let ex = {
        title: title,
        description: description,
        available: available,
        deadLine: deadLine.format("DD/MM/yyyy"),
        questions: questions
    }

    const result = await axios.post(
      `${URL}classroom/${classroomId}/exam`,
      ex
    );

    return result.data;
  }
}
