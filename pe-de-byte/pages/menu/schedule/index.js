import * as React from 'react';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip } from "@mui/material";
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Schedule() {
    const [weekDay, setWeekDay] = React.useState('');

    const handleChange = (event) => {
        setWeekDay(event.target.value);
        handleSearchChange(event);
    };
    const router = useRouter();
    const [schedules, setSchedules] = useState([]);
    const [filteredSchedules, setFilteredSchedules] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleCancel = async (studentId, professionalId, hoursId) => {
        const body = {
            StudentId: studentId,
            ProfessionalId: professionalId,
            HoursId: hoursId
        };
    
        try {
            const response = await axios.put('http://localhost:8080/api/schedule/unscheduling', body);
            if (response.status === 200) {
                console.log('Agendamento cancelado com sucesso!');
            } else {
                throw new Error(`Erro ao cancelar agendamento: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao cancelar agendamento:', error);
        }
    };
    // Configurando o axios para incluir o token
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
    });

    // Busca a lista de profissionais ao carregar a página
    React.useEffect(() => {
        const fetchSchedules = async () => {
            try {
                console.log("Buscando agendamentos na URL: /schedule/scheduling/");
                const response = await axiosInstance.get('/schedule/scheduling/');
                console.log(response.data);
                
                if (response.status !== 200) {
                    throw new Error(`Erro ao buscar agendamentos: ${response.statusText}`);
                }

                setSchedules(response.data);
                setFilteredSchedules(response.data); // Inicializa o estado filtrado com todos os profissionais
            } catch (error) {
                setErrorMessage('Erro ao buscar lista de profissionais. Verifique se o backend está em execução e se a URL está correta.');
                console.error('Erro ao buscar lista de profissionais: ', error);
            }
        };

        fetchSchedules();
    }, []);

    // Função para editar um profissional
    const handleEdit = (id) => {
        router.push({
            pathname: '/menu/schedule/editSchedule',
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
                const url = `/schedule/inativate/${id}`;
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

        const filtered = schedules.filter(professional => 
            professional.student_name.toLowerCase().includes(value) || 
            professional.student_surname.toLowerCase().includes(value) ||
            professional.professional_name.toLowerCase().includes(value) || 
            professional.professional_surname.toLowerCase().includes(value) ||
            professional.specialty?.toLowerCase().includes(value) ||
            (weekDay === "" || professional.weekday.toLowerCase().includes(value)) // Filtra pelo dia da semana

        );
        
        setFilteredSchedules(filtered);
    };

    return (
        <div>
            <MenuBar />
            <div 
                className='headerSchedules' 
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem', marginTop:'8rem' }}
            >
                <Typography 
                    variant="h5" 
                    gutterBottom
                >
                    Agendamentos
                </Typography>
                <Button 
                    id="postSchedules" 
                    variant="contained" 
                    size="large" 
                    href="/menu/schedule/newSchedule/" 
                    startIcon={<AddIcon />} 
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                >
                    Cadastrar
                </Button>
            </div>

                <form onSubmit='' >
                    <Box
                    id='searchSchedules'
                    sx={{ marginLeft:'1rem', marginRight:'1rem', display:'flex', alignItems:'center' }}
                >
                    <TextField variant='outlined' label='Pesquisa por Nome' sx={{width:'100%'}}
                        onChange={handleSearchChange}
                    ></TextField>
                    <Box
                        sx={{ width:'100%', marginLeft:'1rem'}}  
                    >
                        <FormControl sx={{ width: '95%', padding: '1rem' }}>
                            <InputLabel 
                                id="demo-simple-select-helper-label" 
                                sx={{ padding: '1rem' }}
                            >
                                Dia da semana
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={weekDay}
                                onChange={handleChange} 
                                input={<OutlinedInput label="Dia da semana" />}
                                displayEmpty
                                sx={{width:'100%'}}
                            >
                                {/* <MenuItem value="">
                                    <em> </em>
                                </MenuItem> */}
                                <MenuItem value={""}>Todos</MenuItem>
                                <MenuItem value={"segunda"}>Segunda-Feira</MenuItem>
                                <MenuItem value={"terça"}>Terça-Feira</MenuItem>
                                <MenuItem value={"quarta"}>Quarta-Feira</MenuItem>
                                <MenuItem value={"quinta"}>Quinta-Feira</MenuItem>
                                <MenuItem value={"sexta"}>Sexta-Feira</MenuItem>
                                <MenuItem value={"sábado"}>Sábado</MenuItem>
                                <MenuItem value={"domingo"}>Domingo</MenuItem>
                            </Select>
                        </FormControl>

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

            {filteredSchedules.map((schedule) => (
                            <Card 
                            variant='outlined' 
                                sx={{ backgroundColor:'#c5ecf8', margin:'10px 10px' }}
                        >
                <CardContent>
                <Box 
                    sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
                >
                    <PersonIcon/>                
                    <Typography 
                        variant='h6' 
                        sx={{ fontWeight:'bold' }}
                    >
                        {schedule.student_name} {schedule.student_surname}
                    </Typography>
                    <Box 
                        sx={{ marginLeft: '10%', display: 'flex', alignItems: 'center', }}
                    >
                        <GroupsIcon/>
                        <Typography variant='h6'>
                            {schedule.professional_name} {schedule.professional_surname}
                        </Typography>                
                    </Box>
                    <Tooltip title="Cancelar Agendamento">
                        <IconButton aria-label="menu" size="large" 
                                    onClick={() => handleCancel(schedule.student_id, schedule.professional_id, schedule.hours_id)} // Chama a função ao clicar no botão

                        sx={{display:"flex", marginLeft:"auto"}}>
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
                                {schedule.speciality}
                            </Typography>
                        </Box>
                        <Box 
                            sx={{ display:'flex' }}
                        >
                            <EventNoteIcon 
                                fontSize='small'
                            />
                            <Typography>
                               {schedule.weekday} - ( {schedule.start_time} - {schedule.end_time} )
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
            </Card>
            ))}


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