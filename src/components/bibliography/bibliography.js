import React, { useContext, useState, useEffect } from 'react';
import { Grid, Box, Typography, Card } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import BibliographyService from "../../services/bibliographyService";
import { UserContext } from '../../userContext';
import Uploadnew from './uploadnew'
import Item from './item'

const bibliographyService = new BibliographyService();
const biblioInit = {
    id:"",
    title: "",
    description: "",
    file: "",
}

export default function Bibliography() {
    const [bibliography, setBibliography] = useState([])
    const [selectedItem, setSelectedItem] = useState(biblioInit)
    const { user } = useContext(UserContext);
    const classroomId = localStorage.getItem("classroomId")

    const editMode = user.role === "TEACHER"

    useEffect(() => {
        bibliographyService.getBiblio(classroomId)
            .then(res => setBibliography(res))
            .catch(e => console.log(e))
    }, [])

    const selectItem = (item) =>{
        setSelectedItem(item)
    }

    const BibliographyEntries = () => {
        return (
            bibliography.map((item) => {
                return (
                    <Grid item xs={10} key={item.id}>
                        <Item item={item} editMode={editMode} onSelect={selectItem} />
                    </Grid>
                )
            })
        )
    }

    const onBiblioChange = e => {
        setSelectedItem({
            ...selectedItem,
            [e.target.name]: e.target.value
        });
    }

    const uploadBiblio = () => {
        selectedItem.id ? 
        bibliographyService.updateBiblio(classroomId,selectedItem)
        :
        bibliographyService.createBiblio(classroomId,selectedItem)
    }

    return (
        <Box m={2}>
            <Grid
                spacing={2}
                container
                direction="row"
                justify="center"
                wrap
            >
                {
                    editMode ?
                        <Grid item xs={10}>
                            <Uploadnew item={selectedItem} onChange={onBiblioChange} handleUpload={uploadBiblio} />
                        </Grid> :
                        null

                }

                <BibliographyEntries />
            </Grid>
        </Box>
    )
}
