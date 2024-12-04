import * as React from 'react';
import { Box, Button, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CancelIcon from '@mui/icons-material/Cancel';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MenuBar from '../../../components/menuBar';

export default function Schedule() {
    const [weekDay, setWeekDay] = React.useState('');

    const handleChange = (event) => {
        setWeekDay(event.target.value);
    };
    return (
        <div>
            <MenuBar />
            <div 
                className='headerProfessionals' 
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem', marginTop:'8rem' }}
            >
                <Typography 
                    variant="h5" 
                    gutterBottom
                >
                    Agendamentos
                </Typography>
                <Button 
                    id="postProfessional" 
                    variant="contained" 
                    size="large" 
                    href="./newProfessional/newProfessional" 
                    startIcon={<AddIcon />} 
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                >
                    Cadastrar
                </Button>
            </div>

                <form onSubmit='' >
                    <Box
                    id='searchProfessional'
                    sx={{ marginLeft:'1rem', marginRight:'1rem', display:'flex', alignItems:'center' }}
                >
                    <TextField variant='outlined' label='Pesquisa por Nome' sx={{width:'40%'}}></TextField>
                    <Box
                        sx={{ width:'100%', marginLeft:'10px'}}  
    >
                        <InputLabel id="demo-simple-select-helper-label">Dia da semana</InputLabel>
                                <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={weekDay}
                                onChange={handleChange}
                                displayEmpty
                                >
                            <MenuItem value="">
                                <em>nenhuma</em>    
                            </MenuItem>
                            <MenuItem value={-1} selected={true}>Todos</MenuItem>
                            <MenuItem value={0}>Segunda-Feira</MenuItem>
                            <MenuItem value={1}>Terça-Feira</MenuItem>
                            <MenuItem value={2}>Quarta-Feira</MenuItem>
                            <MenuItem value={3}>Quinta-Feira</MenuItem>
                            <MenuItem value={4}>Sexta-Feira</MenuItem>
                            <MenuItem value={5}>Sábado</MenuItem>
                            <MenuItem value={6}>Domingo</MenuItem>
                        </Select>
                    </Box>
                    <Tooltip title='Pesquisar'>
                        <Button 
                            variant='contained' 
                            startIcon={<SearchIcon sx={{width:'35px', height:'35px'}}/>} 
                            sx={{ marginLeft:'auto', width:'50px' }}
                        />
                    </Tooltip>
                </Box>
            </form>
            <Card 
                variant='outlined' 
                    sx={{ backgroundColor:'#c5ecf8', margin:'10px 10px' }}
            >
                {professionalInfo}
            </Card>
        </div>
    );
}

const professionalInfo = (
    <React.Fragment>
        <CardContent>
            <Box 
                sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
            >
                <PersonIcon/>                
                <Typography 
                    variant='h6' 
                    sx={{ fontWeight:'bold' }}
                >
                    Fulano da Silva
                </Typography>
                <Box 
                    sx={{ marginLeft: '10%', display: 'flex', alignItems: 'center', }}
                >
                    <GroupsIcon/>
                    <Typography variant='h6'>
                        Bertrano da Bicicletinha
                    </Typography>                
                </Box>
                <Tooltip title="Cancelar Agendamento">
                    <IconButton aria-label="menu" size="large" href="" sx={{display:"flex", marginLeft:"auto"}}>
                        <CancelIcon fontSize="inherit" sx={{color:'#000000'}}></CancelIcon>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box 
                sx={{display:'flex'}}
            >
                <Box>
                    <Box 
                        sx={{ display:'flex' }}
                    >
                        <MedicalInformationIcon 
                            fontSize='small'
                        />
                        <Typography>
                            Especialidade
                        </Typography>
                    </Box>
                    <Box 
                        sx={{ display:'flex' }}
                    >
                        <EventNoteIcon 
                            fontSize='small'
                        />
                        <Typography>
                            Horários aqui devem ser separados por vírgula
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    </React.Fragment>
);