import React, { useContext, useState, useEffect } from "react";
import { Grid, Box, CircularProgress } from "@material-ui/core";
import BibliographyService from "../../services/bibliographyService";
import { UserContext } from "../../userContext";
import Uploadnew from "./uploadnew";
import Item from "./item";
import SnackbarOpen from "../snackbar/snackbar";
import { useStyles } from "./style";

const bibliographyService = new BibliographyService();
const biblioInit = {
  id: "",
  title: "",
  description: "",
  file: "",
};

export default function Bibliography() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [bibliography, setBibliography] = useState([]);
  const [selectedItem, setSelectedItem] = useState(biblioInit);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { user } = useContext(UserContext);
  const classroomId = localStorage.getItem("classroomId");

  const editMode = user.role === "TEACHER";

  useEffect(() => {
    fetchData();
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

  const fetchData = () => {
    setLoading(true);
    bibliographyService
      .getBiblio(classroomId)
      .then((res) => {
        setBibliography(res);

        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbar({
          open: true,
          message:
            "Error al cargar la bibliografia, intente nuevamente mas tarde ",
          severity: "error",
        });
      });
  };
  const selectItem = (item) => {
    setSelectedItem(item);
  };

  const BibliographyEntries = () => {
    return bibliography.map((item) => {
      return (
        <Grid item xs={10} key={item.id}>
          <Item
            item={item}
            editMode={editMode}
            handleDelete={deleteItem}
            onSelect={selectItem}
          />
        </Grid>
      );
    });
  };

  const uploadBiblio = (item) => {
    selectedItem.id
      ? bibliographyService
          .updateBiblio(classroomId, item)
          .then(() => {
            setSnackbar({
              open: true,
              message: "Bibliografia editada exitosamente!",
              severity: "success",
            });
            fetchData();
            setSelectedItem(biblioInit);
          })
          .catch(() => {
            setSnackbar({
              open: true,
              message:
                "Error al editar la bibliografia, intente nuevamente mas tarde ",
              severity: "error",
            });
            fetchData();
            setSelectedItem(biblioInit);
          })
      : bibliographyService
          .createBiblio(classroomId, item)
          .then(() => {
            setSnackbar({
              open: true,
              message: "Bibliografia creada exitosamente!",
              severity: "success",
            });
            fetchData();
            setSelectedItem(biblioInit);
          })
          .catch(() => {
            setSnackbar({
              open: true,
              message:
                "Error al crear la bibliografia, intente nuevamente mas tarde ",
              severity: "error",
            });
            fetchData();
            setSelectedItem(biblioInit);
          });
  };

  const deleteItem = (itemId) => {
    bibliographyService
      .removeBiblio(classroomId, itemId)
      .then(() => {
        setSnackbar({
          open: true,
          message: "Bibliografia eliminada exitosamente!",
          severity: "success",
        });
        fetchData();
        setSelectedItem(biblioInit);
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message:
            "Error al eliminar la bibliografia, intente nuevamente mas tarde ",
          severity: "error",
        });
        fetchData();
        setSelectedItem(biblioInit);
      });
  };

  if (loading)
    return (
      <CircularProgress
        size={100}
        style={{ color: "#636363", marginTop: "300px" }}
      />
    );

  return (
    <div className={classes.backgroundImg}> 
      <Box m={2} p={2}>
        <Grid spacing={2} container direction="row" justify="center">
          {editMode ? (
            <Grid item xs={10}>
              <Uploadnew
                itemP={selectedItem}
                handleUpload={uploadBiblio}
                loading={loading}
              />
            </Grid>
          ) : null}

          <BibliographyEntries />
        </Grid>
        <SnackbarOpen
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          closeSnac={closeSnackbar}
        />
      </Box>
    </div>
  );
}
