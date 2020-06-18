import React, { useContext, useState, useEffect } from 'react'
import ForumPost from './forumPost'
import NewPost from './newPost'
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
        getForumPosts();
    }, []);

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbar({
          ...snackbar,
          open: false,
        });
    }

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

    //TODO SEARCH DE FORO
    //TODO SNACKBAR !

    return (
        <div>
            <NewPost setSnackbar={setSnackbar}></NewPost>
            {
                isLoaded ?
                    posts.map(p => {
                        return <ForumPost post={p} key={p.id} setSnackbar={setSnackbar}/>
                    })
                :
                <div></div>
            }
            <SnackbarOpen open={snackbar.open} message={snackbar.message} severity={snackbar.severity} closeSnac={closeSnackbar}/>
        </div>
    )
}
