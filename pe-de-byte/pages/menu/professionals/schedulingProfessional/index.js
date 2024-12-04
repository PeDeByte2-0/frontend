import { Box, Button, TextField, MenuItem, Autocomplete, InputAdornment, Select } from "@mui/material";
import React from 'react';
import InputMask from 'react-input-mask';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br'; // Importa a localização para português do Brasil
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from "dayjs";

dayjs.locale('pt-br');
dayjs.extend(localizedFormat);

export default function EditProfessional() {
    const students = ['Karen Stackoski', 'Fulano da Silva']

    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div>
            <div 
                className='headerProfessionalsEdit' 
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem' }}>
                <Typography 
                    variant="h5" 
                    gutterBottom>
                        Agendamento com Profissional
                </Typography>
                <Button 
                    id='backProfessional'
                    variant='outlined'
                    size='large'
                    href='../professionals'
                    startIcon={<ReplyIcon />}
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        Voltar
                </Button>
                <Button 
                    id="savePostProfessional" 
                    variant="contained" 
                    size="large" 
                    href="" 
                    startIcon={<SaveIcon />} 
                    sx={{ marginLeft:'1rem' }}>
                        Salvar
                </Button>
            </div>
            <Box id='scheduleForm'>
                <Autocomplete
                    disablePortal
                    options={students}
                    sx={{ width: 600, display:"flex", margin:'1rem'}}
                    renderInput={(params) => <TextField {...params}
                    label="Aluno"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}/>}>
                </Autocomplete>
                <Box sx={{padding:'1rem'}}>
                    
                    <TextField id="dateAndDays"
                        label='Data e Hora'
                        variant="outlined"
                        select
                        sx={{width:'30%'}}>

                    </TextField>
                </Box>
                <Box sx={{padding:'1rem'}}>
                    <TextField
                        id="activities"
                        label='Atividades'
                        multiline
                        sx={{width:'80%'}}
                    />
                </Box>
            </Box>
        </div>
    );
}