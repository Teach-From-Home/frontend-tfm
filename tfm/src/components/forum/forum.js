import React, { useContext, useState, useEffect } from 'react'
import ForumPost from './forumPost'
import SearchPost from './newPost'
import ForumService from '../../services/forumService';
import { UserContext } from '../../userContext'
import SnackbarOpen from '../snackbar/snackbar'

export default function Forum() {
    const {user, setUser} = useContext(UserContext);
    const [posts, setPosts] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const forumService = new ForumService();

    useEffect(() => {
        getForumPosts()
    }, []);

    const getForumPosts = async () => {
        if(!isLoaded){
            try {
                let posts = await forumService.getForumPosts(user.id, user.selectedClassroom.id);
                setPosts(posts);
                setIsLoaded(true);
            } catch (err) {
                setSnackbar({
                    open: true,
                    message: err.response.data.error,
                    severity: 'error'
                });
            }
        }
    }

    return (
        <div>
            <SearchPost></SearchPost>
            {
                isLoaded ?
                    posts.map(p => {
                        return <ForumPost post={p} key={p.id}/>
                    })
                :
                <div></div>
            }
        </div>
    )
}
