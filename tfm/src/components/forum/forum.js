import React, { useContext, useState, useEffect } from 'react'
import ForumPost from './forumPost'
import NewPost from './newPost'
import ForumService from '../../services/forumService';
import { UserContext } from '../../userContext'
import SnackbarOpen from '../snackbar/snackbar'
import CircularProgress from "@material-ui/core/CircularProgress";

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
        try {
            let posts = await forumService.getForumPosts(user.id, user.selectedClassroom.id);
            setPosts(posts);
            setIsLoaded(true);
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'error', //TODO
                severity: 'error'
            });
        }
    }

    //TODO SEARCH DE FORO
    //TODO SNACKBAR !
    
    return (
        <div>
            <NewPost setSnackbar={setSnackbar} getForumPosts={getForumPosts}></NewPost>
            {
                posts ?
                    posts.map(p => {
                        return <ForumPost post={p} key={p.id} setSnackbar={setSnackbar} />
                    })
                :
                <CircularProgress/>
            }
            <SnackbarOpen open={snackbar.open} message={snackbar.message} severity={snackbar.severity} closeSnac={closeSnackbar}/>
        </div>
    )
}
