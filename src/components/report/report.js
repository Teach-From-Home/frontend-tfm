import React from 'react';
import MaterialTable from 'material-table';

export default function Report() {
    return (
        <div>
           <MaterialTable
            columns={[
                { title: 'Nombre', field: 'name' },
                { title: 'Apellido', field: 'lastname' },
                { title: 'Porcentaje de asistencia', field: 'porcentage' },
                { title: 'Cantidad de asistencias', field: 'ca' },
            ]}
            data={[
                {name: 'Eugenio', lastname: 'Rossetto', porcentage: 50, ca: 10}
            ]}
           title="Reporte de asistencia a clase"
           />
        </div>
    )
}
