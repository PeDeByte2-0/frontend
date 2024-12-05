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

    const [schools, setSchools] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [cellphoneNumber, setCellphoneNumber] = useState('');
    const [unityApae, setUnityApae] = useState('');
    const [daysWeek, setAvailableHours] = useState([]);
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
        if (response.status === 200) {
            const data = response.data;
            setName(data.first_name || "");
            setLastName(data.last_name || "");
            setCpf(data.cpf || "");
            setCellphoneNumber(data.celular || "");
            setUnityApae(data.school_id || "");
            setAvailableHours(data.availableHoursId || []); // IDs dos horários
            setSpecialityId(data.speciality_id || "");
            setObservations(data.obs || "");

            
        } else {
            throw new Error(`Erro ao buscar profissional: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Erro ao buscar profissional:", error);   
        setErrorMessage("Erro ao buscar profissional.");
    } finally {
        setLoading(false);
    }
};

        const fetchProfessionalHours = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/hours/`);
                if (response.status === 200) {
                    setAvailableHours(
                        response.data.map((hour) => ({
                            value: hour.id_hours,
                            label: `${hour.weekday} ${hour.starttime} - ${hour.endtime}`,
                        }))
                    );
                } else {
                    throw new Error(`Erro ao buscar horas: ${response.statusText}`);
                }
            } catch (error) {
                console.error("Erro ao buscar horários:", error);
                setErrorMessage("Erro ao buscar horários disponíveis.");
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

        fetchProfessional();
        fetchSchools();
        fetchSpecialities();
        fetchProfessionalHours();
    }, [id]);

    const isDisabled =
        name === '' ||
        lastName === '' ||
        cpf === '' ||
        cellphoneNumber === '' ||
        unityApae === '' ||
        specialityId === '' ||
        daysWeek.length === 0;

        const handleDaysChange = (event) => {
            const { value } = event.target;
            setAvailableHours(value);  // Atualiza o estado corretamente
        };

    const handleSave = async () => {
        const updatedProfessional = {
            idSchool: unityApae,
            firstName: name,
            lastName: lastName,
            cpf,
            celular: cellphoneNumber,
            specialityId,
            AvailableHoursId: daysWeek,
            obs: observations,
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
                    <InputMask
                        mask={id}
                        maskChar=""
                        value={id || ""}  // Se o id não estiver disponível, o valor será uma string vazia
                    >
                        {() => (
                            <TextField
                                id="id"
                                variant="outlined"
                                label="ID do Profissional"
                                value={id || ""}  // Garante que o valor do campo seja uma string vazia ou o id
                                sx={{ marginRight: "1rem", width: "200px" }}
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{ shrink: true }}  // Força o label a ficar acima
                            />
                        )}
                    </InputMask>

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
                        renderValue={(selected) => {
                            if (selected.length === 0) return 'Nenhuma seleção';  // Mensagem quando nada é selecionado
                            // Usando availableHoursOptions para renderizar corretamente os rótulos
                            const selectedLabels = daysWeek
                                .filter(option => selected.includes(option.value))  // Filtra as opções selecionadas
                                .map(option => option.label);  // Mapeia para os rótulos
                            return selectedLabels.join(', ');  // Junta os rótulos com vírgula entre eles
                        }}
                        MenuProps={MenuProps}
                    >
                        {daysWeek.map((hour) => (
                            <MenuItem key={hour.value} value={hour.value}>
                                <Checkbox checked={daysWeek.includes(hour.value)} />
                                <ListItemText primary={hour.label} />
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
