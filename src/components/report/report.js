import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { ColorButton } from "./style";
import { Box, Typography } from "@material-ui/core";
import ClassroomService from "../../services/classroomService";

export default function Report() {
  const [reporte, setReporte] = useState(null);
  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([]);

  const classroomService = new ClassroomService();

  useEffect(() => {}, []);

  const getReporteAsistencias = () => {
    setColumns([
      { title: "Nombre", field: "name" },
      { title: "Apellido", field: "lastName" },
      { title: "Cantidad de asistencias", field: "parcial" },
      {
        title: "Porcentaje de asistencia",
        field: "percentage",
        render: (rowData) => `${rowData.percentage}%`,
      },
      { title: "Cantidad de clases", field: "total" },
    ]);

    setTitle("Reporte de Asistencia");

    let type = "asistance";

    classroomService
      .getReport(localStorage.selectedClassroom, type)
      .then((data) => {
        setReporte(data);
      });
  };

  const getReporteTareas = () => {
    setColumns([
      { title: "Nombre", field: "name" },
      { title: "Apellido", field: "lastName" },
      {
        title: "Porcentaje de tareas realizadas",
        field: "percentage",
        render: (rowData) => `${rowData.percentage}%`,
      },
      { title: "Cantidad de tareas", field: "total" },
    ]);

    setTitle("Reporte de Tareas");

    let type = "homework";

    classroomService
      .getReport(localStorage.selectedClassroom, type)
      .then((data) => {
        setReporte(data);
      });
  };

  const getReporteExams = () => {
    setColumns([
      { title: "Nombre", field: "name" },
      { title: "Apellido", field: "lastName" },
      {
        title: "Porcentaje de examenes",
        field: "percentage",
        render: (rowData) => `${rowData.percentage}%`,
      },
      { title: "Cantidad de examenes", field: "total" },
    ]);

    setTitle("Reporte de Examenes");

    let type = "exams";

    classroomService
      .getReport(localStorage.selectedClassroom, type)
      .then((data) => {
        setReporte(data);
      });
  };

  const getReporteNotaTareas = () => {
    setColumns([
      { title: "Nombre", field: "name" },
      { title: "Apellido", field: "lastName" },
      { title: "Promedio", field: "parcial" },
      { title: "Cantidad de tareas", field: "total" },
    ]);

    setTitle("Reporte de Nota de Tareas");

    let type = "homeworkgrade";

    classroomService
      .getReport(localStorage.selectedClassroom, type)
      .then((data) => {
        setReporte(data);
      });
  };

  const getReporteNotaExamenes = () => {
    setColumns([
      { title: "Nombre", field: "name" },
      { title: "Apellido", field: "lastName" },
      { title: "Promedio", field: "parcial" },
      { title: "Cantidad de examenes", field: "total" },
    ]);

    setTitle("Reporte de Nota de Examenes");

    let type = "examsgrade";

    classroomService
      .getReport(localStorage.selectedClassroom, type)
      .then((data) => {
        setReporte(data);
      });
  };

  const getReeporteNotasTotal = () => {
    setColumns([
      { title: "Nombre", field: "name" },
      { title: "Apellido", field: "lastName" },
      { title: "Promedio", field: "parcial" },
    ]);

    setTitle("Reporte de Promedio de Notas");

    let type = "totalgrade";

    classroomService
      .getReport(localStorage.selectedClassroom, type)
      .then((data) => {
        setReporte(data);
      });
  };

  return (
    <div>
      <Box m={2}>
        <ColorButton
          style={{ marginTop: "5px" }}
          onClick={getReporteAsistencias}
        >
          Ver reporte de asistencias
        </ColorButton>
        <ColorButton
          style={{ marginLeft: "5px", marginTop: "5px" }}
          onClick={getReporteTareas}
        >
          Ver reporte de tareas entregadas
        </ColorButton>
        <ColorButton
          style={{ marginLeft: "5px", marginTop: "5px" }}
          onClick={getReporteExams}
        >
          Ver reporte de examenes
        </ColorButton>
        <ColorButton
          style={{ marginLeft: "5px", marginTop: "5px" }}
          onClick={getReporteNotaTareas}
        >
          Ver reporte de notas de tareas
        </ColorButton>
        <ColorButton
          style={{ marginLeft: "5px", marginTop: "5px" }}
          onClick={getReporteNotaExamenes}
        >
          Ver reporte de notas de examenes
        </ColorButton>
        <ColorButton
          style={{ marginLeft: "5px", marginTop: "5px" }}
          onClick={getReeporteNotasTotal}
        >
          Ver reporte de promedio de notas
        </ColorButton>
      </Box>
      <Box m={2}>
        {reporte ? (
          <MaterialTable
            columns={columns}
            data={reporte}
            title={title}
            localization={{
              pagination: {
                labelDisplayedRows: "{from} de {count}",
                labelRowsSelect: "registros",
                previousAriaLabel: "Anterior",
                previousTooltip: "Anterior",
                nextAriaLabel: "Siguiente",
                nextTooltip: "Siguiente",
              },
              toolbar: {
                searchTooltip: "Buscar..",
                searchPlaceholder: "Buscar..",
              },
              header: {
                actions: "Actions",
              },
              body: {
                emptyDataSourceMessage: "No hay registros para mostrar",
                filterRow: {
                  filterTooltip: "Filtrar",
                },
              },
            }}
            options={{
              showFirstLastPageButtons: false,
            }}
          />
        ) : (
          <Typography
            variant="h3"
            style={{ marginTop: "100px", color: "#636363" }}
          >
            Seleccione un reporte para cargar datos.
          </Typography>
        )}
      </Box>
    </div>
  );
}
