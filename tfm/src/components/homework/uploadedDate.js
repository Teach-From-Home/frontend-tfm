import React from 'react'
import { Typography } from '@material-ui/core'

const UploadedDate = ({uploadedOutOfTerm,uploadDate}) => {
    return (
        <div>
            {
                uploadedOutOfTerm ?
                    <Typography variant='body1' color="error">Entregada fuera de termino el {uploadDate}</Typography> :
                    <Typography variant='body1'>Entregada el {uploadDate}</Typography>
            }
            <hr/>
        </div>
    )
}

export default UploadedDate
