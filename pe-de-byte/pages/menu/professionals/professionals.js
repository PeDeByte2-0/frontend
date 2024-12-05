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
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import Head from 'next/head';

export default function Professionals() {
    return (
        <div>
            <Head>
                <title>Profissionais | Pé de Byte 2.0</title>
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
                            <IconButton aria-label="schedule" size="large" href="../schedule/schedule">
                                <EventIcon fontSize="inherit" sx={{color:'#000000'}}></EventIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip 
                            title="Profissionais"
                        >
                            <IconButton 
                                aria-label="professionals" 
                                size="large" 
                                href="./professionals"
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
                    Profissionais
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
                <TextField variant='outlined' label='Pesquisa por Profissional' sx={{width:'95%'}}></TextField>
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
                <Typography 
                    variant='h5' 
                    sx={{ fontWeight:'bold' }}
                >
                    Fulano da Silva
                </Typography>
                <Box 
                    sx={{ marginLeft: '10%', display: 'flex', alignItems: 'center', }}
                >
                    <Typography>
                        Especialidade
                    </Typography>                
                </Box>
                <Button 
                    id="professionalScheduling" 
                    variant="contained" 
                    size="large" 
                    href="./schedulingProfessional/schedulingProfessional" 
                    startIcon={<EditCalendarIcon />} 
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        Agendar
                </Button>
            </Box>
            <Box 
                sx={{display:'flex'}}
            >
                <Box>
                    <Box 
                        sx={{ display:'flex' }}
                    >
                        <PhoneAndroidIcon 
                            fontSize='small'
                        />
                        <Typography>
                            (48) 99999-9999
                        </Typography>
                    </Box>
                    <Box 
                        sx={{ display:'flex' }}
                    >
                        <PhoneIcon 
                            fontSize='small'
                        />
                        <Typography>
                            (48) 3499-9999
                        </Typography>
                    </Box>
                </Box>
                <Box 
                    sx={{marginLeft:'auto'}}
                >
                    <Box 
                        sx={{display:'flex', marginLeft:'auto'}}
                    >
                        <Tooltip 
                            title="Editar"
                        >
                            <IconButton 
                                aria-label="menu" 
                                size="large" 
                                href="./editProfessional/editProfessional"
                            >
                                <EditIcon 
                                    fontSize="inherit" 
                                    sx={{color:'#000000'}}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip 
                            title="Excluir"
                        >
                            <IconButton 
                                aria-label="menu" 
                                size="large" 
                                href=""
                            >
                                <DeleteIcon 
                                    fontSize="inherit" 
                                    sx={{color:'#000000'}}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    </React.Fragment>
);