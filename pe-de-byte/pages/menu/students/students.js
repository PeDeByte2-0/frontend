import React, {useEffect} from 'react';
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
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import { useState } from "react";
import Head from 'next/head';

export default function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/students');
                const data = await response.json();
                const studentsNecessities = await Promise.all(
                    data.map(async (student) => {
                        const necessityResponse = await fetch(`http://localhost:8080/api/students/necessity/${student.id_person}`);
                        const necessityData = await necessityResponse.json();
                        return { ...student, necessity: necessityData };
                    })
                );
                setStudents(studentsNecessities);
                
            } catch (error) {
                console.log('Erro ao buscar lista de alunos: ', error);
            }
        };
        fetchStudents();
    }, []);

    return (
        <div>
            <Head>
                <title>Alunos | Pé de Byte 2.0</title>
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
                                href="./students"
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
                    Alunos
                </Typography>
                <Button 
                    id="postProfessional" 
                    variant="contained" 
                    size="large" 
                    href="./newStudent/newStudent" 
                    startIcon={<AddIcon />} 
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                >
                    Cadastrar
                </Button>
            </div>
            <Box
                id='searchStudent'
                sx={{ marginLeft:'1rem', marginRight:'1rem', display:'flex', alignItems:'center' }}
            >
                <TextField variant='outlined' label='Pesquisa por Aluno' sx={{width:'95%'}}></TextField>
                <Tooltip title='Pesquisar'>
                    <Button 
                        variant='contained' 
                        startIcon={<SearchIcon sx={{width:'35px', height:'35px'}}/>} 
                        sx={{ marginLeft:'auto', width:'50px' }}
                    />
                </Tooltip>
            </Box>
            <Box
                id='studentsList'
            >
                {students.map((student, index) => (
                    <Card 
                        variant='outlined' 
                        sx={{ backgroundColor:'#c5ecf8', margin:'10px 10px' }}
                    >
                        <CardContent>
                            <Box 
                                sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
                            >                
                                <Typography 
                                    variant='h5' 
                                    sx={{ fontWeight:'bold' }}
                                >
                                    {`${student.first_name} ${student.last_name}`}
                                </Typography>
                                <Box 
                                    sx={{ marginLeft: '10%', display: 'flex', alignItems: 'center', }}
                                >
                                    <Typography>
                                        {student.obs}
                                    </Typography>                
                                </Box>
                                <Button id="studentScheduling" 
                                    variant="outlined" 
                                    size="large"
                                    href="./schedulingStudent/schedulingStudent" 
                                    startIcon={<EventNoteIcon />} 
                                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                                >
                                    Agenda
                                </Button>
                            </Box>
                            <Box 
                                sx={{display:'flex'}}
                            >
                                <Box>
                                    <Box 
                                        sx={{ display:'flex' }}
                                    >
                                        <AccountBoxIcon 
                                            fontSize='small'
                                        />
                                        <Typography>
                                            {student.responsavel}
                                        </Typography>
                                    </Box>
                                    <Box 
                                        sx={{ display:'flex' }}
                                    >
                                        <PhoneIcon 
                                            fontSize='small'
                                        />
                                        <Typography>
                                            {student.celular}
                                        </Typography>
                                    </Box>
                                    <Box 
                                        sx={{ display:'flex' }}
                                    >
                                        <MedicalInformationIcon 
                                            fontSize='small'
                                        />
                                     
                                        {student.necessity.map((nec, index) => (
                                            <Typography key={index} sx={{ marginLeft: '24px' }}>
                                                {nec.name}, {/* Certifique-se de que está acessando o campo correto da necessidade */}
                                            </Typography>
                                        ))}
                                   
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
                                                href={`./editStudent/editStudent/${student.id}`}
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
                    </Card>
                ))}
            </Box>
        </div>
    );
}