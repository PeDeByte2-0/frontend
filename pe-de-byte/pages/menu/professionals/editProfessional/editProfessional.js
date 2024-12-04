import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, MenuItem, Checkbox, Select, InputLabel, FormControl, OutlinedInput, ListItemText, Typography } from "@mui/material";
import InputMask from 'react-input-mask';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { useRouter } from 'next/router';
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

export default function EditProfessional() {
    const router = useRouter();
    const { id } = router.query;

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

    const specialities = [
        { value: '1', label: 'Fonoaudiólogo' },
        { value: '2', label: 'Psicólogo' },
        { value: '3', label: 'Fisioterapeuta' },
        { value: '4', label: 'Terapeuta Ocupacional' },
    ];

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [cellphoneNumber, setCellphoneNumber] = useState('');
    const [unityApae, setUnityApae] = useState('');
    const [daysWeek, setDaysWeek] = useState([]);
    const [specialityId, setSpecialityId] = useState('');
    const [observations, setObservations] = useState('');
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchProfessional = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/professionals/${id}`);
                
                if (response.status !== 200) {
                    throw new Error(`Erro ao buscar profissional: ${response.statusText}`);
                }

                const data = response.data;

                // Preenche os estados com os dados recebidos
                setName(data.firstName || "");
                setLastName(data.lastName || "");
                setCpf(data.cpf || "");
                setTelephoneNumber(data.telefone || "");
                setCellphoneNumber(data.celular || "");
                setUnityApae(data.idSchool || "");
                setDaysWeek(data.availableHoursId || []);
                setSpecialityId(data.specialityId || "");
                setObservations(data.obs || "");
            } catch (error) {
                console.error("Erro ao buscar dados do profissional:", error);
                setErrorMessage("Erro ao buscar dados do profissional. Verifique se o servidor está disponível e tente novamente.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchProfessional();
    }, [id]);

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
        const {
            target: { value },
        } = event;
        setDaysWeek(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSave = async () => {
        const updatedProfessional = {
            idSchool: unityApae, // ID da unidade APAE (string)
            firstName: name, // Nome do profissional
            lastName: lastName, // Sobrenome do profissional
            cpf, // CPF do profissional
            celular: cellphoneNumber, // Número do celular do profissional
            telefone: telephoneNumber, // Telefone do profissional
            specialityId, // ID da especialidade (string)
            AvailableHoursId: daysWeek, // IDs dos horários disponíveis (array de strings)
            obs: observations, // Observações adicionais
        };

        console.log("Dados que estão sendo enviados para atualização:", updatedProfessional);

        try {
            const response = await axios.put(
                `http://localhost:8080/api/professionals/${id}`,
                updatedProfessional
            );

            if (response.status === 200) {
                setSuccessMessage('Profissional atualizado com sucesso!');
                setErrorMessage('');
                router.push('../professionals');
            } else {
                throw new Error(`Erro ao atualizar profissional: ${response.statusText}`);
            }
        } catch (error) {
            const errorData = error.response?.data || error.message;
            setErrorMessage(`Erro ao atualizar profissional: ${errorData}`);
            console.error('Erro ao atualizar profissional:', errorData);
        }
    };
    
    if (loading) {
        return (
            <Typography variant="body1" sx={{ margin: '10px' }}>
                Carregando...
            </Typography>
        );
    }

    return (
        <div>
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
            <div 
                className='headerProfessionalsCreate' 
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem' }}>
                <Typography 
                    variant="h5" 
                    gutterBottom>
                        Editar Profissional
                </Typography>
                <Button 
                    id='backProfessional'
                    variant='outlined'
                    size='large'
                    href='../professionals'
                    startIcon={<ReplyIcon />}
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        Voltar
                </Button>
                <Button 
                    id="savePostProfessional" 
                    variant="contained" 
                    size="large" 
                    onClick={handleSave} 
                    startIcon={<SaveIcon />} 
                    sx={{ marginLeft:'1rem' }}
                    disabled={isDisabled}>
                        Salvar
                </Button>
            </div>
            <Box id='editProfessionalForm'>
                <Box id='idProfessional' sx={{ display: 'flex', padding: '1rem' }}>
                    <TextField 
                        id='id' 
                        variant='outlined' 
                        label='ID do Profissional' 
                        value={id}
                        sx={{ marginRight: '1rem', width: '200px' }} 
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <Box id='fullNameProfessional' sx={{ display: 'flex', padding: '1rem' }}>
                    <TextField 
                        id='name' 
                        variant='outlined' 
                        label='Nome' 
                        value={name}
                        sx={{ marginRight: '1rem', width: '200px' }} 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField 
                        id='lastName' 
                        variant='outlined' 
                        label='Sobrenome' 
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
                                id='cpf'
                                variant='outlined'
                                label='CPF'
                                sx={{ marginRight: '1rem', width: '150px' }}
                            />
                        )}
                    </InputMask>
                </Box>
                <Box id='numberInfo' sx={{ display: 'flex', padding: '1rem' }}>
                    <InputMask
                        mask="(99) 9999-9999"
                        maskChar=""
                        value={telephoneNumber}
                        onChange={(e) => setTelephoneNumber(e.target.value)}
                    >
                        {() => (
                            <TextField
                                id='telephoneNumber'
                                variant='outlined'
                                label='Telefone'
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
                                id='cellphoneNumber'
                                variant='outlined'
                                label='Celular'
                                sx={{ marginRight: '1rem', width: '155px' }}
                            />
                        )}
                    </InputMask>
                </Box>
                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione a unidade APAE que o profissional atende
                </Typography>
                <Box id='professionalInfo' sx={{ padding: '1rem' }}>
                    <TextField
                        select
                        id="unityApae"
                        variant="outlined"
                        label="Unidade"
                        value={unityApae}
                        sx={{ width: '400px', marginRight: '1rem' }}
                        onChange={(e) => setUnityApae(e.target.value)}
                    >
                        {apaes.map((option) => (
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
                        {specialities.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione os dias da semana e horários disponíveis para atendimentos
                </Typography>
                <FormControl sx={{ width: '30%', padding: '1rem' }}>
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
            </Box>
            <Box sx={{ padding: '1rem' }}>
                <TextField
                    multiline
                    label="Observações"
                    variant="outlined"
                    value={observations}
                    sx={{ width: '40%' }}
                    onChange={(e) => setObservations(e.target.value)}
                />
            </Box>
        </div>
    );
}
