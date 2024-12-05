// import * as React from 'react';
import { Box, Button, TextField, MenuItem, FormGroup, FormControlLabel, Checkbox, Select, InputLabel, FormControl, OutlinedInput, ListItemText } from "@mui/material";
import React from 'react';
import InputMask from 'react-input-mask';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { useState } from 'react';
import Head from "next/head";

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
        {
          value: 'Criciuma',
          label: 'Criciúma',
        },
        {
          value: 'Tubarao',
          label: 'Tubarão',
        },
        {
          value: 'Lauro Muller',
          label: 'Lauro Müller',
        },
        {
          value: 'Icara',
          label: 'Içara',
        },
    ];

    const professionalFunction = [
        'Deixar aqui as especialidades dos profissionais',
    ];

    const daysOfTheWeek = [
        'Segunda-feira 08:00',
        'Terça-feira 08:00',
        'Quarta-feira 08:00',
        'Quinta-feira 08:00',
        'Sexta-feira 08:00',
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
    const [studentNeed, setstudentNeed] = useState([]);

    const isDisabled = name === '' || 
                       lastName ==='' || 
                       cpf === '' || 
                       nameParent === '' || 
                       lastNameParent ==='' || 
                       cpfParent === '' || 
                       telephoneNumber === '' || 
                       cellphoneNumber === '' || 
                       unityApae === '' || 
                       studentNeed.length === 0 ||
                       daysWeek.length === 0;

    const handleNeedChange = (event) => {
        const {
          target: { value },
        } = event;
        setstudentNeed(
          // On autofill, we get a stringified value
          typeof value === 'string' ? value.split(',') : value
        );
    };

    const handleDaysChange = (event) => {
        const {
          target: { value },
        } = event;
        setDaysWeek(
          // On autofill, we get a stringified value
          typeof value === 'string' ? value.split(',') : value
        );
    };
    
    return (
        <div>
            <Head>
                <title>Alunos | Pé de Byte 2.0</title>
            </Head>
            <div 
                className='headerStudentsCreate' 
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem' }}>
                <Typography 
                    variant="h5" 
                    gutterBottom>
                        Cadastro de Alunos
                </Typography>
                <Button 
                    id='backStudents'
                    variant='outlined'
                    size='large'
                    href='../students'
                    startIcon={<ReplyIcon />}
                    sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        Voltar
                </Button>
                <Button 
                    id="savePostStudent" 
                    variant="contained" 
                    size="large" 
                    href="" 
                    startIcon={<SaveIcon />} 
                    sx={{ marginLeft:'1rem' }}
                    disabled={isDisabled}>
                        Salvar
                </Button>
            </div>
            <Box 
                id='createStudentForm'>
                <Box 
                    id='fullNameStudent' 
                    sx={{display:'flex', padding:'1rem'}}>
                    <TextField 
                        id='name' 
                        variant='outlined' 
                        label='Nome' 
                        sx={{marginRight:'1rem', width:'200px'}} 
                        onChange={(e) => setName(e.target.value)}>
                    </TextField>
                    <TextField 
                        id='lastName' 
                        variant='outlined' 
                        label='Sobrenome' 
                        sx={{marginRight:'1rem', width:'400px'}} 
                        onChange={(e) => setLastName(e.target.value)}>
                    </TextField>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=""
                        onChange={(e) => setCpf(e.target.value)}
                    >
                        {() => (
                            <TextField
                                id='cpf'
                                variant='outlined'
                                label='CPF'
                                sx={{marginRight:'1rem', width:'150px'}}
                            />
                        )}
                    </InputMask>
                </Box>
                <Box 
                    id='fullNameParent' 
                    sx={{display:'flex', padding:'1rem'}}>
                    <TextField 
                        id='name' 
                        variant='outlined' 
                        label='Nome Responsável' 
                        sx={{marginRight:'1rem', width:'200px'}} 
                        onChange={(e) => setNameParent(e.target.value)}>
                    </TextField>
                    <TextField 
                        id='lastName' 
                        variant='outlined' 
                        label='Sobrenome Responsável' 
                        sx={{marginRight:'1rem', width:'400px'}} 
                        onChange={(e) => setLastNameParent(e.target.value)}>
                    </TextField>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=""
                        onChange={(e) => setCpfParent(e.target.value)}
                    >
                        {() => (
                            <TextField
                                id='cpf'
                                variant='outlined'
                                label='CPF Responsável'
                                sx={{marginRight:'1rem', width:'150px'}}
                            />
                        )}
                    </InputMask>
                </Box>
                <Box 
                    id='numberInfo' 
                    sx={{display:'flex', padding:'1rem'}}>
                    
                    <InputMask
                        mask="(99) 9999-9999"
                        maskChar=""
                        onChange={(e) => setTelephoneNumber(e.target.value)}
                    >
                        {() => (
                            <TextField
                                id='telephoneNumber'
                                variant='outlined'
                                label='Telefone'
                                sx={{marginRight:'1rem', width:'150px'}}
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
                                id='cellphoneNumber'
                                variant='outlined'
                                label='Celular'
                                sx={{marginRight:'1rem', width:'155px'}}
                            />
                        )}
                    </InputMask>
                </Box>
                <Typography 
                    sx={{marginLeft:'1rem'}}>
                        Selecione a unidade APAE que o profissional atende
                </Typography>
                <Box 
                    id='profesionalInfo' 
                    sx={{padding:'1rem'}}>
                    <TextField 
                        select id="unityApae" 
                        variant="outlined" 
                        label="Unidade" 
                        sx={{width:'400px', marginRight:'1rem'}} 
                        onChange={(e) => setUnityApae(e.target.value)}>
                            {apaes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                    <FormControl sx={{ width: '30%'}}>
                <InputLabel id="days-select-label">Necessidades</InputLabel>
                <Select
                    labelId="days-select-label"
                    id="days-select"
                    multiple
                    value={studentNeed}
                    onChange={handleNeedChange}
                    input={<OutlinedInput label="Necessidades" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {professionalFunction.map((need) => (
                    <MenuItem key={need} value={need}>
                        <Checkbox checked={studentNeed.includes(need)} />
                        <ListItemText primary={need} />
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                </Box>
                <Typography 
                    sx={{marginLeft:'1rem'}}>
                        Selecione os dias da semana e horários que estará disponível para atendimentos
                </Typography>
                <FormControl sx={{ width: '30%', padding: '1rem' }}>
                <InputLabel id="days-select-label" sx={{padding:'1rem'}}>Dia e Hora</InputLabel>
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
                    {daysOfTheWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                        <Checkbox checked={daysWeek.includes(day)} />
                        <ListItemText primary={day} />
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Box>
            <Box sx={{padding:'1rem'}}>
                <TextField
                    multiline
                    label='Observações'
                    variant="outlined"
                    sx={{width:'40%'}}
                />
            </Box>
        </div>
    );
}