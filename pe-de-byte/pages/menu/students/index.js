import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Tooltip, Typography, Card, CardContent, AppBar, TextField } from "@mui/material";
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
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import MenuBar from '../../../components/menuBar';

export default function Students() {
    const router = useRouter();
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Configurando o axios para incluir o token
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
    });

    // Busca a lista de estudantes ao carregar a página
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                console.log("Buscando estudantes na URL: /students");
                const response = await axiosInstance.get('/students');

                if (response.status !== 200) {
                    throw new Error(`Erro ao buscar estudantes: ${response.statusText}`);
                }

                const studentsWithNecessities = await Promise.all(
                    response.data.map(async (student) => {
                        try {
                            const necessityResponse = await axiosInstance.get(`/students/necessity/${student.id_person}`);
                            return {
                                ...student,
                                necessity: necessityResponse.data
                            };
                        } catch (err) {
                            console.error(`Erro ao buscar necessidades do aluno ${student.id_person}:`, err);
                            return { ...student, necessity: [] };
                        }
                    })
                );

                setStudents(studentsWithNecessities);
                setFilteredStudents(studentsWithNecessities); // Inicializa o estado filtrado com todos os estudantes
            } catch (error) {
                setErrorMessage('Erro ao buscar lista de estudantes. Verifique se o backend está em execução e se a URL está correta.');
                console.error('Erro ao buscar lista de estudantes: ', error);
            }
        };

        fetchStudents();
    }, []);

    // Função para editar um estudante
    const handleEdit = (id) => {
        router.push({
            pathname: '/menu/students/editStudent',
            query: { id }
        });
    };

    // Função para inativar um estudante
    const handleDelete = async (id) => {
        if (!id) {
            setErrorMessage('ID do estudante inválido. Verifique se ele está correto.');
            console.error('ID do estudante está indefinido ou nulo.');
            return;
        }

        if (confirm('Tem certeza de que deseja inativar este estudante?')) {
            try {
                console.log(`Tentando inativar o estudante com ID: ${id}`);
                const url = `/students/inativate/${id}`;

                const response = await axiosInstance.put(url);

                if (response.status === 200) {
                    console.log('Estudante inativado com sucesso.');
                    setStudents(students.filter(student => student.id_person !== id));
                    setFilteredStudents(filteredStudents.filter(student => student.id_person !== id));
                } else {
                    throw new Error(`Erro ao inativar estudante: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Erro ao inativar estudante:', error);
                if (error.response && error.response.status === 404) {
                    setErrorMessage('Erro 404: Endpoint não encontrado. Verifique a URL e tente novamente.');
                } else {
                    setErrorMessage('Erro ao inativar estudante. Tente novamente.');
                }
            }
        }
    };

    // Função para filtrar os estudantes
    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = students.filter(student => 
            student.first_name?.toLowerCase().includes(value) || 
            student.last_name?.toLowerCase().includes(value) ||
            student.obs?.toLowerCase().includes(value)
        );
        
        setFilteredStudents(filtered);
    };

    return (
        <div>
            <MenuBar />
            <div className='headerStudents' style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem', marginTop: '8rem' }}>
                <Typography variant="h5" gutterBottom>
                    Alunos
                </Typography>
                <Button
                    id="postStudent"
                    variant="contained"
                    size="large"
                    href="/menu/students/newStudent"
                    startIcon={<AddIcon />}
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                >
                    Cadastrar
                </Button>
            </div>
            <Box
                id='searchStudent'
                sx={{ marginLeft: '1rem', marginRight: '1rem', display: 'flex', alignItems: 'center' }}
            >
                <TextField
                    variant='outlined'
                    label='Pesquisar Aluno'
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
            <Box id='studentsList'>
                {filteredStudents.map((student) => (
                    <Card key={student.id_person} variant='outlined' sx={{ backgroundColor: '#c5ecf8', margin: '10px 10px' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                    {`${student.first_name || ''} ${student.last_name || ''}`}
                                </Typography>
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                    {" ___"}  {` Id: ${student.id_person || 'Sem ID'}`}
                                </Typography>
                                <Box sx={{ marginLeft: '10%', display: 'flex', alignItems: 'center' }}>
                                    <Typography>{student.obs || 'Sem observações'}</Typography>
                                </Box>
                                <Button
                                    id="studentScheduling"
                                    variant="outlined"
                                    size="large"
                                    href="./students/schedulingStudent"
                                    startIcon={<EventNoteIcon />}
                                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                                >
                                    Agenda
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <AccountBoxIcon fontSize='small' />
                                        <Typography>{student.responsavel || 'Sem responsável'}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <PhoneIcon fontSize='small' />
                                        <Typography>{student.celular || 'Sem celular'}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <MedicalInformationIcon fontSize='small' />
                                        {Array.isArray(student.necessity) && student.necessity.length > 0 ? (
                                            student.necessity.map((nec, index) => (
                                                <Typography key={index} sx={{ marginLeft: '24px' }}>
                                                    {nec.name}{index < student.necessity.length - 1 ? ', ' : ''}
                                                </Typography>
                                            ))
                                        ) : (
                                            <Typography sx={{ marginLeft: '24px' }}>Nenhuma necessidade cadastrada</Typography>
                                        )}
                                    </Box>
                                </Box>
                                <Box sx={{ marginLeft: 'auto' }}>
                                    <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
                                        <Tooltip title="Editar">
                                            <IconButton aria-label="edit" size="large" onClick={() => handleEdit(student.id_person)}>
                                                <EditIcon fontSize="inherit" sx={{ color: '#000000' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <IconButton aria-label="delete" size="large" onClick={() => handleDelete(student.id_person)}>
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
