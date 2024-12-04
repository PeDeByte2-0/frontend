// import * as React from 'react';
import { Box, Button, TextField, MenuItem, FormGroup, FormControlLabel, Checkbox, Select, InputLabel, FormControl, OutlinedInput, ListItemText } from "@mui/material";
import React from 'react';
import InputMask from 'react-input-mask';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { useState } from 'react';

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
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [cellphoneNumber, setCellphoneNumber] = useState('');
    const [unityApae, setUnityApae] = useState('');
    const [daysWeek, setDaysWeek] = useState([]);
    const [professionalFunction, setProfessionalFunction] = useState('');

    const isDisabled = name === '' || lastName ==='' || cpf === '' || telephoneNumber === '' || cellphoneNumber === '' || unityApae === '' || professionalFunction === '' || daysWeek.length === 0;

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
            <div 
                className='headerProfessionalsCreate' 
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '1rem' }}>
                <Typography 
                    variant="h5" 
                    gutterBottom>
                        Cadastro de Profissional
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
                    href="" 
                    startIcon={<SaveIcon />} 
                    sx={{ marginLeft:'1rem' }}
                    disabled={isDisabled}>
                        Salvar
                </Button>
            </div>
            <Box 
                id='createProfessionalForm'>
                <Box 
                    id='fullName' 
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
                        sx={{width:'400px'}} 
                        onChange={(e) => setLastName(e.target.value)}>
                    </TextField>
                </Box>
                <Box 
                    id='numberInfo' 
                    sx={{display:'flex', padding:'1rem'}}>
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
                                sx={{width:'155px'}}
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
                    <TextField 
                        id="professionalFunction" 
                        variant="outlined" 
                        label="Especialidade" 
                        onChange={(e) => setProfessionalFunction(e.target.value)}>
                    </TextField>
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