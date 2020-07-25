import React, { useState } from "react";
import MaterialTable from "material-table";
import { ColorButton } from "./style";
import { Box } from "@material-ui/core";

export default function Report() {
  const [showAsistencias, setShowAsistencias] = useState(true);
  const [showTareas, setShowTareas] = useState(false);
  const [showParticipacion, setShowParticipacion] = useState(false);

  return (
    <div>
      <Box m={2}>
        <ColorButton
          style={{ marginTop: "5px" }}
          onClick={() => {
            setShowAsistencias(!showAsistencias);
            setShowTareas(false);
            setShowParticipacion(false);
          }}
        >
          Ver reporte de asistencias
        </ColorButton>
        <ColorButton
          style={{ marginLeft: "5px", marginTop: "5px" }}
          onClick={() => {
            setShowTareas(!showTareas);
            setShowAsistencias(false);
            setShowParticipacion(false);
          }}
        >
          Ver reporte de tareas entregadas
        </ColorButton>
        <ColorButton
          style={{ marginLeft: "5px", marginTop: "5px" }}
          onClick={() => {
            setShowParticipacion(!showParticipacion);
            setShowAsistencias(false);
            setShowTareas(false);
          }}
        >
          Ver reporte de participacion
        </ColorButton>
      </Box>
      {showAsistencias ? (
        <MaterialTable
          columns={[
            { title: "Nombre", field: "name" },
            { title: "Apellido", field: "lastname" },
            { title: "Porcentaje de asistencia", field: "porcentage" },
            { title: "Cantidad de asistencias", field: "ca" },
          ]}
          data={[
            { name: "Eugenio", lastname: "Rossetto", porcentage: 50, ca: 10 },
            { name: "asddsa", lastname: "Rossetto", porcentage: 50, ca: 10 },
          ]}
          title="Reporte de asistencia a clase"
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
      ) : null}
      {showTareas ? (
        <MaterialTable
          columns={[
            { title: "Nombre", field: "name" },
            { title: "Apellido", field: "lastname" },
            { title: "Porcentaje de tareas entregadas", field: "porcentage" },
            { title: "Cantidad de tareas entregadas", field: "cte" },
          ]}
          data={[
            { name: "Eugenio", lastname: "Rossetto", porcentage: 50, cte: 10 },
          ]}
          title="Reporte de tareas entregadas"
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
      ) : null}

      {showParticipacion ? (
        <MaterialTable
          columns={[
            { title: "Nombre", field: "name" },
            { title: "Apellido", field: "lastname" },
            {
              title: "Porcentaje de participacion en el foro",
              field: "porcentage",
            },
            { title: "Cantidad de post en el foro", field: "cpf" },
          ]}
          data={[
            { name: "Eugenio", lastname: "Rossetto", porcentage: 50, cpf: 15 },
          ]}
          title="Reporte de participacion en el foro"
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
      ) : null}
    </div>
  );
}
