import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Tooltip, Typography, Card, CardContent, AppBar, TextField } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import MenuBar from '../../../components/menuBar';

export default function Professionals() {
    const router = useRouter();
    const [professionals, setProfessionals] = useState([]);
    const [filteredProfessionals, setFilteredProfessionals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Configurando o axios para incluir o token
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
    });

    // Busca a lista de profissionais ao carregar a página
    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                console.log("Buscando profissionais na URL: /professionals");
                const response = await axiosInstance.get('/professionals');

                if (response.status !== 200) {
                    throw new Error(`Erro ao buscar profissionais: ${response.statusText}`);
                }

                setProfessionals(response.data);
                setFilteredProfessionals(response.data); // Inicializa o estado filtrado com todos os profissionais
            } catch (error) {
                setErrorMessage('Erro ao buscar lista de profissionais. Verifique se o backend está em execução e se a URL está correta.');
                console.error('Erro ao buscar lista de profissionais: ', error);
            }
        };

        fetchProfessionals();
    }, []);

    // Função para editar um profissional
    const handleEdit = (id) => {
        router.push({
            pathname: '/menu/professionals/editProfessional/editProfessional',
            query: { id }
        });
    };

    // Função para inativar um profissional
    const handleDelete = async (id) => {
        if (!id) {
            setErrorMessage('ID do profissional inválido. Verifique se ele está correto.');
            console.error('ID do profissional está indefinido ou nulo.');
            return;
        }

        if (confirm('Tem certeza de que deseja inativar este profissional?')) {
            try {
                console.log(`Tentando inativar o profissional com ID: ${id}`);
                const url = `/professionals/inativate/${id}`;
                console.log(`URL usada para inativar o profissional: ${url}`);

                const response = await axiosInstance.put(url);

                if (response.status === 200) {
                    console.log('Profissional inativado com sucesso.');
                    setProfessionals(professionals.filter(professional => professional.id_person !== id));
                    setFilteredProfessionals(filteredProfessionals.filter(professional => professional.id_person !== id));
                } else {
                    throw new Error(`Erro ao inativar profissional: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Erro ao inativar profissional:', error);
                if (error.response && error.response.status === 404) {
                    setErrorMessage('Erro 404: Endpoint não encontrado. Verifique a URL e tente novamente.');
                } else {
                    setErrorMessage('Erro ao inativar profissional. Tente novamente.');
                }
            }
        }
    };

    // Função para filtrar os profissionais
    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = professionals.filter(professional => 
            professional.first_name.toLowerCase().includes(value) || 
            professional.last_name.toLowerCase().includes(value) ||
            professional.specialty_name?.toLowerCase().includes(value) ||
            professional.obs?.toLowerCase().includes(value)
        );
        
        setFilteredProfessionals(filtered);
    };

    return (
        <div>
            <MenuBar />
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
            <Box
                id='searchProfessional'
                sx={{ marginLeft: '1rem', marginRight: '1rem', display: 'flex', alignItems: 'center' }}
            >
                <TextField
                    variant='outlined'
                    label='Pesquisar Profissional'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ width: '95%' }}
                />
                <Tooltip title='Pesquisar'>
                    <Button
                        variant='contained'
                        startIcon={<SearchIcon sx={{ width: '35px', height: '35px' }} />}
                        sx={{ marginLeft: 'auto', width: '50px' }}
                    />
                </Tooltip>
            </Box>
            <Box id='professionalsList'>
                {filteredProfessionals.map((professional) => (
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
                                        <Typography>{professional.obs || 'Sem observações'}</Typography>
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
                                            <IconButton aria-label="delete" size="large" onClick={() => handleDelete(professional.id_person)}>
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
