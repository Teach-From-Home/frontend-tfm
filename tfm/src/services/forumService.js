import axios from 'axios';
import { URL } from './URL'

export default class ForumService {

    async getForumPosts(userId, classroomId) {
        const result = await axios.get(`${URL}classroom/${classroomId}/posts/${userId}`, );
        return result.data;
    }
}

