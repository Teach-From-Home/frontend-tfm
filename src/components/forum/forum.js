import React, { useContext, useState, useEffect } from "react";
import ForumPost from "./forumPost";
import NewPost from "./newPost";
import ForumService from "../../services/forumService";
import { UserContext } from "../../userContext";
import SnackbarOpen from "../snackbar/snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

export default function Forum() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState(false);
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
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error al cargar los post del foro", //TODO
        severity: "error",
      });
    }
  };

  //TODO SEARCH DE FORO
  //TODO SNACKBAR !

  return (
    <div>
      <NewPost
        setSnackbar={setSnackbar}
        getForumPosts={getForumPosts}
      ></NewPost>
      {posts ? (
        posts.map((p) => {
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
      {posts.length === 0 ? (
        <Typography
          variant="h3"
          style={{ marginTop: "100px", color: "#636363" }}
        >
          {" "}
          No hay posts subidos aun..
        </Typography>
      ) : (
        ""
      )}
      <SnackbarOpen
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnac={closeSnackbar}
      />
    </div>
  );
}
