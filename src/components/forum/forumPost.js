import React, { useState, useEffect, useContext } from "react";
import { Typography, Grid, Card, Box, Button, Divider, Tooltip} from "@material-ui/core";
import { useStyles, StyledBadge } from "./style";
import AvatarWithName from "../avatarWithName";
import Comments from "./comments";
import ForumService from "../../services/forumService";
import { UserContext } from "../../userContext";
import EditPostDialog from "./editPostDialog";
import Icon from "@material-ui/core/Icon";

export default function ForumPost(props) {
  const classes = useStyles();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const forumService = new ForumService();
  const post = props.post;
  const setSnackbar = props.setSnackbar;
  const getForumPosts = props.getForumPosts;

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Para abrir el dialog
  const handleClickOpen = () => {
    setUser({
      ...user,
      editPost: post,
    });
    setOpen(true);
  };

  //Para cerrar el dialog
  const handleClose = () => {
    setUser({
      ...user,
      editPost: null,
    });
    getForumPosts();
    setOpen(false);
  };

  const openComments = () => {
    setShowComments(!showComments);
  };

  const getComments = async () => {
    try {
      let data = await forumService.getPostComments(post.id);
      setComments(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al cargar los comentarios", //todo ERROR ESTE
        severity: "error",
      });
    }
  };

  const canEdit = () => {
    return user.id === post.user.id;
  };

  const deletePost = () => {
    try {
      forumService.deletePost(post.id).then(() => {
        setSnackbar({
          open: true,
          message: "Post eliminado.",
          severity: "success",
        });
        getForumPosts();
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al eliminar el post.",
        severity: "error",
      });
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Box m={2}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <AvatarWithName
                name={`${post.user.name}`}
                lastName={`${post.user.lastname}`}
              ></AvatarWithName>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body1">{post.text}</Typography>
              <Typography variant="caption">{post.date}</Typography>
            </Grid>
          </Grid>
          <div className={classes.iconsBottom}>
            <Grid container spacing={2}>
              <Button onClick={openComments}>
                <StyledBadge badgeContent={comments.length}>
                  <Icon style={{ color: "#636363" }}>chat</Icon>
                </StyledBadge>
              </Button>
              {canEdit() ? (
                <Button onClick={handleClickOpen}>
                  <Icon style={{ color: "#636363" }}>edit</Icon>
                </Button>
              ) : (
                null
              )}
              {canEdit() ? (
                <Button onClick={deletePost}>
                  <Icon style={{ color: "#636363" }}>delete</Icon>
                </Button>
              ) : (
                null
              )}
              { post.private ? 
                <Tooltip title="Este post es privado">
                  <span>
                    <Button disabled>
                      <Icon style={{ color: "#636363" }}>lock</Icon>
                    </Button>
                  </span>
                </Tooltip>
                :
                null
              }
            </Grid>
          </div>
        </Box>
        <Divider></Divider>
        {showComments ? (
          <Comments
            comments={comments}
            postId={post.id}
            getComments={getComments}
            setSnackbar={setSnackbar}
          />
        ) : (
          <div></div>
        )}
        {user.editPost ? (
          <EditPostDialog
            open={open}
            onClose={handleClose}
            setSnackbar={setSnackbar}
            key={post.id}
          ></EditPostDialog>
        ) : (
          <div></div>
        )}
      </Card>
    </div>
  );
}
