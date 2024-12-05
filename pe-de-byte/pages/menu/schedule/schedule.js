import * as React from 'react';
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CancelIcon from '@mui/icons-material/Cancel';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Head from 'next/head';

export default function Schedule() {
    return (
        <div>
            <Head>
                <title>Agendamentos | Pé de Byte 2.0</title>
            </Head>
            <AppBar 
                sx={{ height: '17%',  backgroundColor: '#61c7e7' }}
            >
                <Box 
                    sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
                >
				    <img 
                        src='/apae.png' 
                        style={{ width: '90px', height: '90px', display: 'block', margin: '10px 10px' }} 
                        alt='Logo'
                    >
                    </img>
                    <div 
                        className="options" 
                        style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                    >
                        <Tooltip 
                            title="Página inicial"
                        >
                            <IconButton 
                                aria-label="menu" 
                                size="large"
                                 href="../menu"
                            >
                                <HomeIcon 
                                    fontSize="inherit" 
                                    sx={{color:'#000000'}}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Agendamentos">
                            <IconButton aria-label="schedule" size="large" href="./schedule">
                                <EventIcon fontSize="inherit" sx={{color:'#000000'}}></EventIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip 
                            title="Profissionais"
                        >
                            <IconButton 
                                aria-label="professionals" 
                                size="large" 
                                href="../professionals/professionals"
                            >
                                <GroupsIcon 
                                    fontSize="inherit" 
                                    sx={{color:'#000000'}}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip 
                            title="Alunos"
                        >
                            <IconButton 
                                aria-label="students" 
                                size="large" 
                                href="../students/students"
                            >
                                <PersonIcon 
                                    fontSize="inherit" 
                                    sx={{color:'#000000'}}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip 
                            title="Sair"
                        >
                            <IconButton 
                                aria-label="logout" 
                                size="large" 
                                href="../../"
                            >
                                <LogoutIcon 
                                    fontSize="inherit" 
                                    sx={{color:'#000000'}}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Box>
			</AppBar>
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
            <Box
                id='searchProfessional'
                sx={{ marginLeft:'1rem', marginRight:'1rem', display:'flex', alignItems:'center' }}
            >
                <TextField variant='outlined' label='Pesquisa por Agendamento' sx={{width:'95%'}}></TextField>
                <Tooltip title='Pesquisar'>
                    <Button 
                        variant='contained' 
                        startIcon={<SearchIcon sx={{width:'35px', height:'35px'}}/>} 
                        sx={{ marginLeft:'auto', width:'50px' }}
                    />
                </Tooltip>
            </Box>
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