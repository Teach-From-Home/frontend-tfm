import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { ColorButton } from "./style";
import { Box, Typography } from "@material-ui/core";
import ClassroomService from "../../services/classroomService";

export default function Report() {

  const [reporte, setReporte] = useState(null);
  const [title, setTitle] = useState('');
  const [columns, setColumns] = useState([]);

  const classroomService = new ClassroomService();

  useEffect(() => {
  }, [])

  const getReporteAsistencias = () => {
    setColumns([
      { title: "Nombre", field: "name" },
      { title: "Apellido", field: "lastName" },
      { title: "Porcentaje de asistencia", field: "percentage" },
      { title: "Cantidad de asistencias", field: "total" },
    ])

    setTitle('Reporte de Asistencia');

    let type = 'asistance'

    classroomService.getReport(localStorage.selectedClassroom, type).then(data => {
      setReporte(data);
    })
  }
  
  const getReporteTareas = () => {
    setColumns([
      { title: "Nombre", field: "name" },
      { title: "Apellido", field: "lastName" },
      { title: "Porcentaje de tareas realizadas", field: "percentage" },
      { title: "Cantidad de tareas", field: "total" },
    ])

    setTitle('Reporte de Tareas');

    let type = 'homework'

    classroomService.getReport(localStorage.selectedClassroom, type).then(data => {
      setReporte(data);
    })
  }

  const getReporteExams = () => {
    setColumns([
      { title: "Nombre", field: "name" },
      { title: "Apellido", field: "lastName" },
      { title: "Porcentaje de asistencia", field: "percentage" },
      { title: "Cantidad de asistencias", field: "total" },
    ])

    setTitle('Reporte de Examenes');

    let type = 'exams'

    classroomService.getReport(localStorage.selectedClassroom, type).then(data => {
      setReporte(data);
    })
  }

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
      </Box>
      {
        reporte ? 
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
        :
        <Typography
          variant="h3"
          style={{ marginTop: "100px", color: "#636363" }}
        >
          Seleccione un reporte para cargar datos.
        </Typography>
      }
        
    </div>
  );
}
