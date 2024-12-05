import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Checkbox, Select, InputLabel, FormControl, OutlinedInput, ListItemText, Typography } from '@mui/material';
import InputMask from 'react-input-mask';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';
import { useRouter } from 'next/router';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EditStudent() {
    const router = useRouter();
    const { id } = router.query;

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [nameParent, setNameParent] = useState('');
    const [lastNameParent, setLastNameParent] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [cellphoneNumber, setCellphoneNumber] = useState('');
    const [unityApae, setUnityApae] = useState('');
    const [daysWeek, setDaysWeek] = useState([]);
    const [availableHours, setAvailableHours] = useState([]);
    const [schools, setSchools] = useState([]);
    const [selectedNecessities, setSelectedNecessities] = useState([]);
    const [necessities, setNecessities] = useState([]);
    const [observations, setObservations] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Função para buscar os dados do aluno ao carregar a página
    useEffect(() => {
        const fetchStudentData = async () => {
            if (!id) return;

            try {
                const response = await axios.get(`http://localhost:8080/api/students/${id}`);
                if (response.status === 200) {
                    const student = response.data;
                    setName(student.first_name || '');
                    setLastName(student.last_name || '');
                    setCpf(student.cpf || '');
                    setCellphoneNumber(student.celular || '');
                    setTelephoneNumber(student.celular_2 || '');
                    setNameParent(student.responsavel ? student.responsavel.split(' ')[0] : '');
                    setLastNameParent(student.responsavel ? student.responsavel.split(' ').slice(1).join(' ') : '');
                    setUnityApae(student.id_school || '');
                    setObservations(student.obs || '');

                    // Busca as necessidades do aluno
                    const necessitiesResponse = await axios.get(`http://localhost:8080/api/students/necessity/${id}`);
                    if (necessitiesResponse.status === 200) {
                        const studentNecessities = necessitiesResponse.data.map((nec) => nec.id_speciality);
                        setSelectedNecessities(studentNecessities);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar dados do aluno:', error);
                setErrorMessage('Erro ao buscar dados do aluno. Tente novamente.');
            }
        };

        const fetchNecessities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/speciality');
                if (response.status === 200) {
                    setNecessities(response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar lista de necessidades:', error);
                setErrorMessage('Erro ao buscar lista de necessidades. Tente novamente.');
            }
        };

        const fetchAvailableHours = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/hours');
                if (response.status === 200) {
                    setAvailableHours(response.data.map((hour) => ({
                        value: hour.id_hours,
                        label: `${hour.weekday} ${hour.starttime} - ${hour.endtime}`,
                    })));
                } else {
                    throw new Error('Erro ao buscar horários disponíveis');
                }
            } catch (error) {
                console.error('Erro ao buscar horários disponíveis:', error);
                setErrorMessage('Erro ao buscar horários disponíveis. Tente novamente.');
            }
        };

        const fetchSchools = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/School');
                if (response.status === 200) {
                    setSchools(response.data.map((school) => ({
                        value: school.id_school,
                        label: school.name,
                    })));
                } else {
                    throw new Error('Erro ao buscar unidades APAE');
                }
            } catch (error) {
                console.error('Erro ao buscar unidades APAE:', error);
                setErrorMessage('Erro ao buscar unidades APAE. Tente novamente.');
            }
        };

        fetchStudentData();
        fetchNecessities();
        fetchAvailableHours();
        fetchSchools();
    }, [id]);

    const handleDaysChange = (event) => {
        const {
            target: { value },
        } = event;
        setDaysWeek(typeof value === 'string' ? value.split(',') : value);
    };

    const handleNeedChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedNecessities(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSave = async () => {
        if (!unityApae) {
            setErrorMessage("Unidade APAE é obrigatória.");
            return;
        }

        const studentData = {
            idSchool: unityApae,
            firstName: name,
            lastName: lastName,
            cpf: cpf.replace(/\D/g, ''), // Remove pontos e hífens do CPF
            celular: cellphoneNumber.replace(/\D/g, ''), // Remove caracteres não numéricos do celular
            celular2: telephoneNumber ? telephoneNumber.replace(/\D/g, '') : null, // Remove caracteres não numéricos do telefone ou define como null
            responsavel: `${nameParent} ${lastNameParent}`,
            obs: observations,
            idAvalilablehours: daysWeek.length > 0 ? daysWeek.map(String) : [], // Envia um array de strings dos horários disponíveis
            specialits: selectedNecessities.length > 0 ? selectedNecessities.map(String) : [], // Envia um array de strings das necessidades selecionadas
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/api/students/${id}`,
                studentData
            );
            if (response.status === 201) {
                setSuccessMessage('Aluno atualizado com sucesso!');
                setErrorMessage('');

                // Redirecionar automaticamente após salvar com sucesso
                setTimeout(() => {
                    router.push('/menu/students/students');
                }, 2000); // Aguardar 2 segundos antes de redirecionar
            }
        } catch (error) {
            setErrorMessage('Erro ao atualizar aluno. Tente novamente.');
            console.error('Erro:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <div
                className='headerStudentsCreate'
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem' }}
            >
                <Typography variant="h5" gutterBottom>
                    Editar Aluno
                </Typography>
                <Button
                    id="backStudents"
                    variant="outlined"
                    size="large"
                    href="../students"
                    startIcon={<ReplyIcon />}
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                >
                    Voltar
                </Button>
                <Button
                    id="savePostStudent"
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    startIcon={<SaveIcon />}
                    sx={{ marginLeft: '1rem' }}
                >
                    Salvar
                </Button>
            </div>

            {successMessage && (
                <Typography variant="body1" color="success" sx={{ margin: '10px' }}>
                    {successMessage}
                </Typography>
            )}
            {errorMessage && (
                <Typography variant="body1" color="error" sx={{ margin: '10px' }}>
                    {errorMessage}
                </Typography>
            )}

            <Box id="createStudentForm">
                <Box id="studentId" sx={{ display: 'flex', padding: '1rem' }}>
                    <TextField
                        id="studentId"
                        variant="outlined"
                        label="ID do Aluno"
                        value={id}
                        disabled
                        sx={{ marginRight: '1rem', width: '150px' }}
                    />
                </Box>

                <Box id="fullNameStudent" sx={{ display: 'flex', padding: '1rem' }}>
                    <TextField
                        id="name"
                        variant="outlined"
                        label="Nome"
                        value={name}
                        sx={{ marginRight: '1rem', width: '200px' }}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="lastName"
                        variant="outlined"
                        label="Sobrenome"
                        value={lastName}
                        sx={{ marginRight: '1rem', width: '400px' }}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=""
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    >
                        {() => (
                            <TextField
                                id="cpf"
                                variant="outlined"
                                label="CPF"
                                sx={{ marginRight: '1rem', width: '150px' }}
                            />
                        )}
                    </InputMask>
                </Box>

                <Box id="fullNameParent" sx={{ display: 'flex', padding: '1rem' }}>
                    <TextField
                        id="nameParent"
                        variant="outlined"
                        label="Nome Responsável"
                        value={nameParent}
                        sx={{ marginRight: '1rem', width: '200px' }}
                        onChange={(e) => setNameParent(e.target.value)}
                    />
                    <TextField
                        id="lastNameParent"
                        variant="outlined"
                        label="Sobrenome Responsável"
                        value={lastNameParent}
                        sx={{ marginRight: '1rem', width: '400px' }}
                        onChange={(e) => setLastNameParent(e.target.value)}
                    />
                </Box>

                <Box id="numberInfo" sx={{ display: 'flex', padding: '1rem' }}>
                    <InputMask
                        mask="(99) 9999-9999"
                        maskChar=""
                        value={telephoneNumber}
                        onChange={(e) => setTelephoneNumber(e.target.value)}
                    >
                        {() => (
                            <TextField
                                id="telephoneNumber"
                                variant="outlined"
                                label="Telefone"
                                sx={{ marginRight: '1rem', width: '150px' }}
                            />
                        )}
                    </InputMask>
                    <InputMask
                        mask="(99) 99999-9999"
                        maskChar=""
                        value={cellphoneNumber}
                        onChange={(e) => setCellphoneNumber(e.target.value)}
                    >
                        {() => (
                            <TextField
                                id="cellphoneNumber"
                                variant="outlined"
                                label="Celular"
                                sx={{ marginRight: '1rem', width: '155px' }}
                            />
                        )}
                    </InputMask>
                </Box>

                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione a unidade APAE que o aluno está associado
                </Typography>
                <Box id="schoolInfo" sx={{ padding: '1rem' }}>
                    <TextField
                        select
                        id="unityApae"
                        variant="outlined"
                        label="Unidade"
                        value={unityApae}
                        sx={{ width: '400px', marginRight: '1rem' }}
                        onChange={(e) => setUnityApae(e.target.value)}
                    >
                        {schools.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione os dias da semana e horários disponíveis para atendimentos
                </Typography>
                <FormControl sx={{ width: '60%', padding: '1rem' }}>
                    <InputLabel id="days-select-label">Dia e Hora</InputLabel>
                    <Select
                        labelId="days-select-label"
                        id="days-select"
                        multiple
                        value={daysWeek}
                        onChange={handleDaysChange}
                        input={<OutlinedInput label="Dia e Hora" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {availableHours.map((day) => (
                            <MenuItem key={day.value} value={day.value}>
                                <Checkbox checked={daysWeek.includes(day.value)} />
                                <ListItemText primary={day.label} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione as necessidades do aluno
                </Typography>
                <Box id="studentNeeds" sx={{ padding: '1rem' }}>
                    <FormControl sx={{ width: '60%' }}>
                        <InputLabel id="needs-select-label">Necessidades</InputLabel>
                        <Select
                            labelId="needs-select-label"
                            id="needs-select"
                            multiple
                            value={selectedNecessities}
                            onChange={handleNeedChange}
                            input={<OutlinedInput label="Necessidades" />}
                            renderValue={(selected) => selected.map(id => {
                                const necessity = necessities.find(n => n.id_speciality === id);
                                return necessity ? necessity.name : '';
                            }).join(', ')}
                            MenuProps={MenuProps}
                        >
                            {necessities.map((need) => (
                                <MenuItem key={need.id_speciality} value={need.id_speciality}>
                                    <Checkbox checked={selectedNecessities.includes(need.id_speciality)} />
                                    <ListItemText primary={need.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </div>
    );
}
