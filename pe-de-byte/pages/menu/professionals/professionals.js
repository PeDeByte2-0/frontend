import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Tooltip } from "@mui/material";
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
import EventIcon from '@mui/icons-material/Event';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Professionals() {
    const router = useRouter();
    const [professionals, setProfessionals] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/professionals');

                if (response.status !== 200) {
                    throw new Error(`Erro ao buscar profissionais: ${response.statusText}`);
                }

                setProfessionals(response.data);
            } catch (error) {
                setErrorMessage('Erro ao buscar lista de profissionais. Verifique se o backend está em execução e se a URL está correta.');
                console.error('Erro ao buscar lista de profissionais: ', error);
            }
        };

        fetchProfessionals();
    }, []);

    const handleEdit = (id) => {
        // Redirecionando para a página de edição com o ID do profissional
        router.push({
            pathname: '/menu/professionals/editProfessional/editProfessional',
            query: { id }
        });
    };

    return (
        <div>
            <AppBar
                sx={{ height: '17%', backgroundColor: '#61c7e7' }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img
                        src='/apae.png'
                        style={{ width: '90px', height: '90px', display: 'block', margin: '10px 10px' }}
                        alt='Logo'
                    />
                    <div
                        className="options"
                        style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                    >
                        <Tooltip title="Página inicial">
                            <IconButton aria-label="menu" size="large" href="../menu">
                                <HomeIcon fontSize="inherit" sx={{ color: '#000000' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Agendamentos">
                            <IconButton aria-label="schedule" size="large" href="../schedule/schedule">
                                <EventIcon fontSize="inherit" sx={{ color: '#000000' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Profissionais">
                            <IconButton aria-label="professionals" size="large" href="./professionals">
                                <GroupsIcon fontSize="inherit" sx={{ color: '#000000' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Alunos">
                            <IconButton aria-label="students" size="large" href="../students/students">
                                <PersonIcon fontSize="inherit" sx={{ color: '#000000' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Sair">
                            <IconButton aria-label="logout" size="large" href="../../">
                                <LogoutIcon fontSize="inherit" sx={{ color: '#000000' }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Box>
            </AppBar>
            <div className='headerProfessionals' style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem', marginTop: '8rem' }}>
                <Typography variant="h5" gutterBottom>
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
            {errorMessage && (
                <Typography variant="body1" color="error" sx={{ margin: '10px' }}>
                    {errorMessage}
                </Typography>
            )}
            <Box id='professionalsList'>
                {professionals.map((professional) => (
                    <Card key={professional.id_person} variant='outlined' sx={{ backgroundColor: '#c5ecf8', margin: '10px 10px' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                    {`${professional.first_name} ${professional.last_name}`}
                                </Typography>
                                <Box sx={{ marginLeft: '10%', display: 'flex', alignItems: 'center' }}>
                                    <Typography>{professional.specialty_name}</Typography>
                                </Box>
                                <Button
                                    id="professionalScheduling"
                                    variant="contained"
                                    size="large"
                                    href="./schedulingProfessional/schedulingProfessional"
                                    startIcon={<EditCalendarIcon />}
                                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                                >
                                    Agendar
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <PhoneAndroidIcon fontSize='small' />
                                        <Typography>{professional.celular}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <PhoneIcon fontSize='small' />
                                        <Typography>{professional.telefone}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ marginLeft: 'auto' }}>
                                    <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
                                        <Tooltip title="Editar">
                                            <IconButton aria-label="edit" size="large" onClick={() => handleEdit(professional.id_person)}>
                                                <EditIcon fontSize="inherit" sx={{ color: '#000000' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <IconButton aria-label="delete" size="large" href="">
                                                <DeleteIcon fontSize="inherit" sx={{ color: '#000000' }} />
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
