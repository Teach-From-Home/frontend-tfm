import React, { useContext, useState, useEffect } from "react";
import ForumPost from "./forumPost";
import NewPost from "./newPost";
import ForumService from "../../services/forumService";
import { UserContext } from "../../userContext";
import SnackbarOpen from "../snackbar/snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography, TextField, InputAdornment, Icon } from "@material-ui/core";
import { useStyles } from "./style";

export default function Forum() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState(false);
  const [fileteredPosts, setFileteredPosts] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const forumService = new ForumService();

  useEffect(() => {
    getForumPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const getForumPosts = async () => {
    let classroomId = localStorage.getItem("classroomId");

    try {
      let posts = await forumService.getForumPosts(user.id, classroomId);
      setPosts(posts);
      setFileteredPosts(posts)
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error al cargar los post del foro", //TODO
        severity: "error",
      });
    }
  };

  const handleFilter = (e) => {
    if (!posts)
      return
    if (e.target.value === "" || e.target.value === " ") {
      setFileteredPosts(posts)
      return posts
    }
    setFileteredPosts(posts.filter(post => post.title.toLowerCase().includes(e.target.value)))
  }

  return (
    <div className={classes.bground}>
      <NewPost
        setSnackbar={setSnackbar}
        getForumPosts={getForumPosts}
      ></NewPost>
      <br/>
       <TextField
        label="Buscar un post"
        onChange={handleFilter}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          ),
        }}
      />
      {posts.length === 0 ? (
        <Typography
          variant="h3"
          style={{ marginTop: "100px", color: "#636363" }}
        >
          {""}
          No hay posts subidos aun..
        </Typography>
      ) : <span>
        {posts ? (
        fileteredPosts.length === 0 ? 
        <Typography
          variant="h3"
          style={{ marginTop: "100px", color: "#636363" }}
        >
          No hay posts que cumplan el criterio de busqueda
        </Typography>
        :
        fileteredPosts.map((p) => {
          return (
            <ForumPost
              post={p}
              key={p.id}
              setSnackbar={setSnackbar}
              getForumPosts={getForumPosts}
            />
          );
        })
      ) : (
          <div>
            <CircularProgress
              size={100}
              style={{ color: "#636363", marginTop: "90px" }}
            />
          </div>
        )}
      </span> }
      <SnackbarOpen
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnac={closeSnackbar}
      />
    </div>
  );
}
