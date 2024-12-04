import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControl, InputLabel, OutlinedInput, Select, Checkbox, ListItemText, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import InputMask from 'react-input-mask';

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
    const { id } = router.query; // Obtém o ID do aluno a partir da URL
    const [student, setStudent] = useState({
        id: '',
        first_name: '',
        last_name: '',
        cpf: '',
        celular: '',
        telefone: '',
        unityApae: '',
        daysWeek: [], // Certificando-se que `daysWeek` é um array
        studentNeed: [],
        obs: '',
        responsavel: '',
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // Configurando axios com token de autenticação
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
    });

    const apaes = [
        { value: '1', label: 'Criciúma' },
        { value: '2', label: 'Tubarão' },
        { value: '3', label: 'Lauro Müller' },
        { value: '4', label: 'Içara' },
    ];

    const studentNeedsOptions = [
        { value: '1', label: 'Necessidade 1' },
        { value: '2', label: 'Necessidade 2' },
        { value: '3', label: 'Necessidade 3' },
    ];

    useEffect(() => {
        if (id) {
            const fetchStudent = async () => {
                try {
                    const response = await axiosInstance.get(`/students/${id}`);
                    if (response.status !== 200) {
                        throw new Error(`Erro ao buscar dados do aluno: ${response.statusText}`);
                    }
                    setStudent({
                        ...response.data,
                        studentNeed: response.data.studentNeed || [], // Garante que studentNeed seja um array
                        daysWeek: response.data.daysWeek || [] // Garante que daysWeek seja um array
                    });
                } catch (error) {
                    console.error('Erro ao buscar dados do aluno:', error);
                    setErrorMessage('Erro ao buscar dados do aluno. Verifique se o backend está funcionando corretamente.');
                } finally {
                    setLoading(false);
                }
            };

            fetchStudent();
        }
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    };

    const handleDaysChange = (event) => {
        const { value } = event.target;
        setStudent({
            ...student,
            daysWeek: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleNeedChange = (event) => {
        const { value } = event.target;
        setStudent({
            ...student,
            studentNeed: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleSave = async () => {
        try {
            // Preparando os dados para envio de acordo com o exemplo do Postman
            const updatedStudent = {
                idSchool: student.unityApae, // Alinha com o campo `idSchool`
                firstName: student.first_name,
                lastName: student.last_name,
                cpf: student.cpf,
                celular: student.celular,
                celular2: student.telefone || null, // Adicionando `celular2` que seria o telefone fixo
                responsavel: student.responsavel || null, // Garantindo que o responsável seja enviado
                obs: typeof student.obs === 'string' ? student.obs : JSON.stringify(student.obs), // Observações como string
                idAvalilablehours: Array.isArray(student.daysWeek) ? student.daysWeek : [], // Corrigindo para `idAvalilablehours`
                specialits: Array.isArray(student.studentNeed) ? student.studentNeed : [] // Corrigindo para `specialits`
            };

            console.log('Dados preparados para envio:', updatedStudent);

            // Fazendo a requisição para atualizar os dados do aluno
            const response = await axiosInstance.put(`/students/${id}`, updatedStudent);

            if (response.status === 200) {
                console.log('Aluno atualizado com sucesso');
                router.push('../students');
            } else {
                throw new Error(`Erro ao atualizar aluno: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
            setErrorMessage('Erro ao atualizar aluno. Verifique os dados e tente novamente.');
        }
    };

    if (loading) {
        return <Typography>Carregando dados do aluno...</Typography>;
    }

    return (
        <div>
            <div className='headerStudentsEdit' style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem' }}>
                <Typography variant="h5" gutterBottom>
                    Editar Aluno
                </Typography>
                <Button
                    id='backStudents'
                    variant='outlined'
                    size='large'
                    href='../students'
                    startIcon={<ReplyIcon />}
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                >
                    Voltar
                </Button>
                <Button
                    id="saveStudent"
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    startIcon={<SaveIcon />}
                    sx={{ marginLeft: '1rem' }}
                    disabled={!student.first_name || !student.last_name || !student.cpf || !student.celular}
                >
                    Salvar
                </Button>
            </div>
            {errorMessage && (
                <Typography variant="body1" color="error" sx={{ margin: '10px' }}>
                    {errorMessage}
                </Typography>
            )}
            <Box id='editStudentForm'>
                <Box id='studentId' sx={{ padding: '1rem' }}>
                    <TextField
                        id='student_id'
                        name='student_id'
                        variant='outlined'
                        label='ID do Aluno'
                        value={id}
                        sx={{ marginRight: '1rem', width: '200px' }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <Box id='fullNameStudent' sx={{ display: 'flex', padding: '1rem' }}>
                    <TextField
                        id='first_name'
                        name='first_name'
                        variant='outlined'
                        label='Nome'
                        value={student.first_name}
                        sx={{ marginRight: '1rem', width: '200px' }}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id='last_name'
                        name='last_name'
                        variant='outlined'
                        label='Sobrenome'
                        value={student.last_name}
                        sx={{ marginRight: '1rem', width: '400px' }}
                        onChange={handleInputChange}
                    />
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=""
                        value={student.cpf}
                        onChange={handleInputChange}
                    >
                        {() => (
                            <TextField
                                id='cpf'
                                name='cpf'
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
                        value={student.telefone}
                        onChange={handleInputChange}
                    >
                        {() => (
                            <TextField
                                id='telefone'
                                name='telefone'
                                variant='outlined'
                                label='Telefone'
                                sx={{ marginRight: '1rem', width: '150px' }}
                            />
                        )}
                    </InputMask>
                    <InputMask
                        mask="(99) 99999-9999"
                        maskChar=""
                        value={student.celular}
                        onChange={handleInputChange}
                    >
                        {() => (
                            <TextField
                                id='celular'
                                name='celular'
                                variant='outlined'
                                label='Celular'
                                sx={{ width: '155px' }}
                            />
                        )}
                    </InputMask>
                </Box>
                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione a unidade APAE que o aluno frequenta
                </Typography>
                <Box id='studentInfo' sx={{ padding: '1rem' }}>
                    <TextField
                        select
                        id="unityApae"
                        name="unityApae"
                        variant="outlined"
                        label="Unidade"
                        value={student.unityApae}
                        sx={{ width: '400px', marginRight: '1rem' }}
                        onChange={handleInputChange}
                    >
                        {apaes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Typography sx={{ marginLeft: '1rem' }}>
                    Selecione as necessidades do aluno
                </Typography>
                <FormControl sx={{ width: '30%', padding: '1rem' }}>
                    <InputLabel id="student-need-label">Necessidades</InputLabel>
                    <Select
                        labelId="student-need-label"
                        id="student-need"
                        multiple
                        value={student.studentNeed}
                        onChange={handleNeedChange}
                        input={<OutlinedInput label="Necessidades" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {studentNeedsOptions.map((need) => (
                            <MenuItem key={need.value} value={need.value}>
                                <Checkbox checked={Array.isArray(student.studentNeed) && student.studentNeed.includes(need.value)} />
                                <ListItemText primary={need.label} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ padding: '1rem' }}>
                    <TextField
                        multiline
                        id="obs"
                        name="obs"
                        label="Observações"
                        variant="outlined"
                        value={typeof student.obs === 'string' ? student.obs : JSON.stringify(student.obs)}
                        onChange={handleInputChange}
                        sx={{ width: '40%' }}
                    />
                </Box>
            </Box>
        </div>
    );
}
