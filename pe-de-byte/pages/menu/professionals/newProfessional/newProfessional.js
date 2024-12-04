import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Checkbox, Select, InputLabel, FormControl, OutlinedInput, ListItemText, Typography } from '@mui/material';
import InputMask from 'react-input-mask';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';

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

export default function NewProfessional() {
    const [specialities, setSpecialities] = useState([]);
    const [schools, setSchools] = useState([]);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [cellphoneNumber, setCellphoneNumber] = useState('');
    const [unityApae, setUnityApae] = useState('');
    const [daysWeek, setDaysWeek] = useState([]);
    const [specialityId, setSpecialityId] = useState('');
    const [observations, setObservations] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const availableHours = [
        { value: '1', label: 'Segunda-feira 08:00' },
        { value: '2', label: 'Terça-feira 08:00' },
        { value: '3', label: 'Quarta-feira 08:00' },
        { value: '4', label: 'Quinta-feira 08:00' },
        { value: '5', label: 'Sexta-feira 08:00' },
    ];

    // Fetching specialities and schools from the backend
    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/speciality');
                if (response.status === 200) {
                    setSpecialities(response.data);
                } else {
                    throw new Error('Erro ao buscar especialidades');
                }
            } catch (error) {
                console.error('Erro ao buscar especialidades:', error);
                setErrorMessage('Erro ao buscar especialidades. Tente novamente mais tarde.');
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
                setErrorMessage('Erro ao buscar unidades APAE. Tente novamente mais tarde.');
            }
        };

        fetchSpecialities();
        fetchSchools();
    }, []);

    const isDisabled =
        name === '' ||
        lastName === '' ||
        cpf === '' ||
        telephoneNumber === '' ||
        cellphoneNumber === '' ||
        unityApae === '' ||
        specialityId === '' ||
        daysWeek.length === 0;

    const handleDaysChange = (event) => {
        const { target: { value } } = event;
        setDaysWeek(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSave = async () => {
        const professionalData = {
            idSchool: unityApae,
            firstName: name,
            lastName: lastName,
            cpf,
            celular: cellphoneNumber,
            telephoneNumber,
            specialityId,
            AvailableHoursId: daysWeek,
            obs: observations,
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/api/professionals',
                professionalData
            );
            setSuccessMessage('Profissional cadastrado com sucesso!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Erro ao cadastrar profissional. Tente novamente.');
            console.error('Erro:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <div
                className='headerProfessionalsCreate'
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem' }}
            >
                <Typography variant="h5" gutterBottom>
                    Cadastro de Profissional
                </Typography>
                <Button
                    id="backProfessional"
                    variant="outlined"
                    size="large"
                    href="../professionals"
                    startIcon={<ReplyIcon />}
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                >
                    Voltar
                </Button>
                <Button
                    id="savePostProfessional"
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    startIcon={<SaveIcon />}
                    sx={{ marginLeft: '1rem' }}
                    disabled={isDisabled}
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

            <Box id="createProfessionalForm">
                <Box id="fullName" sx={{ display: 'flex', padding: '1rem' }}>
                    <TextField
                        id="name"
                        variant="outlined"
                        label="Nome"
                        sx={{ marginRight: '1rem', width: '200px' }}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="lastName"
                        variant="outlined"
                        label="Sobrenome"
                        sx={{ width: '400px' }}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Box>

                <Box id="numberInfo" sx={{ display: 'flex', padding: '1rem' }}>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=""
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
                    <InputMask
                        mask="(99) 9999-9999"
                        maskChar=""
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
                        onChange={(e) => setCellphoneNumber(e.target.value)}
                    >
                        {() => (
                            <TextField
                                id="cellphoneNumber"
                                variant="outlined"
                                label="Celular"
                                sx={{ width: '155px' }}
                            />
                        )}
                    </InputMask>
                </Box>

                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione a unidade APAE que o profissional atende
                </Typography>
                <Box id="professionalInfo" sx={{ padding: '1rem' }}>
                    <TextField
                        select
                        id="unityApae"
                        variant="outlined"
                        label="Unidade"
                        sx={{ width: '400px', marginRight: '1rem' }}
                        onChange={(e) => setUnityApae(e.target.value)}
                    >
                        {schools.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        id="specialityId"
                        variant="outlined"
                        label="Especialidade"
                        value={specialityId}
                        sx={{ width: '400px' }}
                        onChange={(e) => setSpecialityId(e.target.value)}
                    >
                        {specialities.map((speciality) => (
                            <MenuItem key={speciality.id_speciality} value={speciality.id_speciality}>
                                {speciality.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione os dias da semana e horários que estará disponível para atendimentos
                </Typography>
                <FormControl sx={{ width: '30%', padding: '1rem' }}>
                    <InputLabel id="days-select-label" sx={{ padding: '1rem' }}>Dia e Hora</InputLabel>
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
            </Box>

            <Box sx={{ padding: '1rem' }}>
                <TextField
                    multiline
                    label="Observações"
                    variant="outlined"
                    sx={{ width: '40%' }}
                    onChange={(e) => setObservations(e.target.value)}
                />
            </Box>
        </div>
    );
}
