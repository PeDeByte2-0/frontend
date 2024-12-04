// import * as React from 'react';
import { Box, Button, TextField, MenuItem, FormGroup, FormControlLabel, Checkbox, Select, InputLabel, FormControl, OutlinedInput, ListItemText, Tooltip, IconButton } from "@mui/material";
import React from 'react';
import InputMask from 'react-input-mask';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ReplyIcon from '@mui/icons-material/Reply';
import PersonIcon from '@mui/icons-material/Person';
import CancelIcon from '@mui/icons-material/Cancel';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useState } from 'react';
import { EventNoteOutlined } from "@mui/icons-material";

export default function SchedulingStudent() {
    return(
        <div>
            <div 
                className='headerStudentsCreate' 
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem' }}>
                <Typography 
                    variant="h5" 
                    gutterBottom>
                        Agenda
                </Typography>
                <Button 
                    id='backStudents'
                    variant='outlined'
                    size='large'
                    href='../students'
                    startIcon={<ReplyIcon />}
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        Voltar
                </Button>
            </div>
            <Box id='schedule'>
                <Box id='studentNameInfo' sx={{display:'flex', padding:'1rem', alignItems:'center'}}>
                    <PersonIcon size='large'/>
                    <Typography variant="h5" sx={{fontWeight:'bolder'}}> Nome do aluno</Typography>
                </Box>
                <Box id='scheduleCards'>
                    <Card variant='outlined' sx={{ backgroundColor:'#c5ecf8', margin:'10px 10px' }}>{scheduleInfo}</Card>
                </Box>
            </Box>
        </div>
    );
}

const scheduleInfo = (
    <React.Fragment>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>                
                <Typography variant='h5' sx={{ fontWeight:'bold' }}>Cicrano da Silva</Typography>
                <Tooltip title="Cancelar Agendamento">
                    <IconButton aria-label="menu" size="large" href="" sx={{display:"flex", marginLeft:"auto"}}>
                        <CancelIcon fontSize="inherit" sx={{color:'#000000'}}></CancelIcon>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{display:'flex'}}>
                <Box>
                    <Box sx={{ display:'flex' }}>
                        <MedicalInformationIcon fontSize='small'></MedicalInformationIcon>
                        <Typography>Especialidade</Typography>
                    </Box>
                    <Box sx={{ display:'flex' }}>
                        <EventNoteIcon fontSize='small'></EventNoteIcon>
                        <Typography>Dia e hora</Typography>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    </React.Fragment>
);