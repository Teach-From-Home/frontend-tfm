import axios from 'axios';
import { URL } from './URL'

export default class ForumService {

    async getForumPosts(userId, classroomId) {
        const result = await axios.get(`${URL}classroom/${classroomId}/posts/${userId}`);
        return result.data;
    }

    async getPostComments(postId){
        const result = await axios.get(`${URL}post/${postId}/comments`);
        return result.data;
    }

    async newPost(post, userId, classroomId){
        const result = await axios.post(`${URL}classroom/${classroomId}/post/user/${userId}`, post);
        return result.data;
    }

    async newComment(comment, userId, postId){
        const result = await axios.post(`${URL}post/${postId}/user/${userId}`, comment);
        return result.data;
    }

    async editPost(post, postId){
        var body = post;
        delete body.date;
        const result = await axios.put(`${URL}post/${postId}`, body);
        return result.data;
    }

    async deletePost(postId){
        const result = await axios.delete(`${URL}post/${postId}`);
        return result.data;
    }
}

