import React, { useState } from 'react';
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

export default function NewStudent() {
    const apaes = [
        { value: '1', label: 'Criciúma' },
        { value: '2', label: 'Tubarão' },
        { value: '3', label: 'Lauro Müller' },
        { value: '4', label: 'Içara' },
    ];

    const availableHours = [
        { value: '1', label: 'Segunda-feira 08:00' },
        { value: '2', label: 'Terça-feira 08:00' },
        { value: '3', label: 'Quarta-feira 08:00' },
        { value: '4', label: 'Quinta-feira 08:00' },
        { value: '5', label: 'Sexta-feira 08:00' },
    ];

    const necessities = [
        { value: '1', label: 'Necessidade 1' },
        { value: '2', label: 'Necessidade 2' },
        { value: '3', label: 'Necessidade 3' },
    ];

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [nameParent, setNameParent] = useState('');
    const [lastNameParent, setLastNameParent] = useState('');
    const [cpfParent, setCpfParent] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [cellphoneNumber, setCellphoneNumber] = useState('');
    const [unityApae, setUnityApae] = useState('');
    const [daysWeek, setDaysWeek] = useState([]);
    const [studentNeed, setStudentNeed] = useState([]);
    const [observations, setObservations] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isDisabled =
        name === '' ||
        lastName === '' ||
        cpf === '' ||
        nameParent === '' ||
        lastNameParent === '' ||
        cpfParent === '' ||
        telephoneNumber === '' ||
        cellphoneNumber === '' ||
        unityApae === '' ||
        studentNeed.length === 0 ||
        daysWeek.length === 0;

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
        setStudentNeed(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSave = async () => {
        const studentData = {
            idSchool: unityApae, // ID da unidade APAE
            firstName: name,
            lastName: lastName,
            cpf,
            celular: cellphoneNumber,
            celular2: telephoneNumber,
            responsavel: `${nameParent} ${lastNameParent}`,
            obs: observations,
            idAvalilablehours: daysWeek, // IDs dos horários disponíveis
            specialits: studentNeed, // IDs das necessidades especiais
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/api/students',
                studentData
            );
            setSuccessMessage('Aluno cadastrado com sucesso!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Erro ao cadastrar aluno. Tente novamente.');
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
                    Cadastro de Alunos
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

            <Box id="createStudentForm">
                <Box id="fullNameStudent" sx={{ display: 'flex', padding: '1rem' }}>
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
                        sx={{ marginRight: '1rem', width: '400px' }}
                        onChange={(e) => setLastName(e.target.value)}
                    />
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
                </Box>

                <Box id="fullNameParent" sx={{ display: 'flex', padding: '1rem' }}>
                    <TextField
                        id="nameParent"
                        variant="outlined"
                        label="Nome Responsável"
                        sx={{ marginRight: '1rem', width: '200px' }}
                        onChange={(e) => setNameParent(e.target.value)}
                    />
                    <TextField
                        id="lastNameParent"
                        variant="outlined"
                        label="Sobrenome Responsável"
                        sx={{ marginRight: '1rem', width: '400px' }}
                        onChange={(e) => setLastNameParent(e.target.value)}
                    />
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=""
                        onChange={(e) => setCpfParent(e.target.value)}
                    >
                        {() => (
                            <TextField
                                id="cpfParent"
                                variant="outlined"
                                label="CPF Responsável"
                                sx={{ marginRight: '1rem', width: '150px' }}
                            />
                        )}
                    </InputMask>
                </Box>

                <Box id="numberInfo" sx={{ display: 'flex', padding: '1rem' }}>
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
                                sx={{ marginRight: '1rem', width: '155px' }}
                            />
                        )}
                    </InputMask>
                </Box>

                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione a unidade APAE que o aluno atende
                </Typography>
                <Box id="studentInfo" sx={{ padding: '1rem' }}>
                    <TextField
                        select
                        id="unityApae"
                        variant="outlined"
                        label="Unidade"
                        sx={{ width: '400px', marginRight: '1rem' }}
                        onChange={(e) => setUnityApae(e.target.value)}
                    >
                        {apaes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <FormControl sx={{ width: '30%' }}>
                        <InputLabel id="needs-select-label">Necessidades</InputLabel>
                        <Select
                            labelId="needs-select-label"
                            id="needs-select"
                            multiple
                            value={studentNeed}
                            onChange={handleNeedChange}
                            input={<OutlinedInput label="Necessidades" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {necessities.map((need) => (
                                <MenuItem key={need.value} value={need.value}>
                                    <Checkbox checked={studentNeed.includes(need.value)} />
                                    <ListItemText primary={need.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
