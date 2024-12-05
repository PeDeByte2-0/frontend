// import * as React from 'react';
import { Box, Button, TextField, MenuItem, FormGroup, FormControlLabel, Checkbox, Select, InputLabel, FormControl, OutlinedInput, ListItemText, Tooltip } from "@mui/material";
import React from 'react';
import InputMask from 'react-input-mask';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { useState } from 'react';
import Head from "next/head";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import Cookies from 'js-cookie';
function hoursConverter(hours) {
    return hours.map(e => ({
      ...e, // Copia as propriedades originais
      weekday: e.weekday === "0" ? 'Segunda-feira' :
               e.weekday === "1" ? 'Terça-feira' :
               e.weekday === '2' ? 'Quarta-feira' :
               e.weekday === '3' ? 'Quinta-feira' :
               e.weekday === '4' ? 'Sexta-feira' :
               e.weekday === "5" ? 'Sábado' :
               'Domingo'
    }));
  }
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

export default function newSchedule() {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            //Authorization: `Bearer ${Cookies.get('token')}`,
        },
    });
    const [hours, setHours] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [professionalId, setProfessionalId] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [daysWeek, setDaysWeek] = useState([]);
    const [professionalFunction, setProfessionalFunction] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchProfessional, setSearchProfessional] = useState('');
    const [obs, setObs] = useState('');

    const searchProfessionalById = async () => {
        try {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAa" + studentId);
            
            const response = await axiosInstance.get(`/schedule/matchingProfessional/${studentId}`);

            if (response.status === 200) {

                setProfessionalFunction(hoursConverter(response.data));  // Supondo que a resposta tenha essa propriedade
                console.log('Profissional encontrado:', response.data);
            } else {
                throw new Error(`Erro ao buscar o profissional: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao buscar o profissional:', error);
        }
    };const handleSave = async () => {
        const scheduleData = {
            StudentId: studentId,
            HoursData: hours.map(hour => ({
                id_hours: hour.id_hours,
                id_professional: hour.id_professional
            })),
            Observacao: obs
        };
        
        
        try {
            // Envia os dados com múltiplos horários de uma vez
            const response = await axiosInstance.post('/schedule', scheduleData);
    
            if (response.status === 200) {
                console.log('Agendamentos salvos com sucesso!');
            } else {
                throw new Error(`Erro ao salvar o agendamento: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
        }
    };
    
    const isDisabled = obs === '' || hours === '';

    const handleDaysChange = (event) => {
        const selectedValues = event.target.value;
        setHours(selectedValues);  // Atualiza o estado com o array de objetos
    };
    
    
    return (
        <div>
            <Head>
                <title>Agendamento | Pé de Byte 2.0</title>
            </Head>
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
                    onClick={handleSave}
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
                        id='studentId   ' 
                        variant='outlined' 
                        label='Id do aluno' 
                        sx={{marginRight:'1rem', width:'200px'}} 
                        onChange={(e) => setStudentId(e.target.value)}>
                    </TextField>
                    <Button
                        variant='contained'
                        onClick={searchProfessionalById}
                        startIcon={<SearchIcon sx={{ width: '35px', height: '35px' }} />}
                        sx={{ marginLeft: 'auto', width: '50px' }}
                    />
                </Box>  
                <Typography 
                    sx={{marginLeft:'1rem'}}>
                        Selecione os dias da semana e horários que estará disponível para atendimentos
                </Typography>
                <FormControl sx={{ width: '70%', padding: '1rem' }}>
    <InputLabel id="professional-function-select-label" sx={{ padding: '1rem' }}>
        Função Profissional
    </InputLabel>
    <Select
            labelId="days-select-label"
            id="days-select"
            multiple
            value={hours} // valor selecionado, que é um array
            onChange={handleDaysChange} // função que atualiza o valor selecionado
            input={<OutlinedInput label="Dia e Hora" />}
            renderValue={(selected) => selected.join(', ')} // mostra os valores selecionados como uma lista separada por vírgula
            MenuProps={MenuProps}
        >
            {Array.isArray(professionalFunction) && professionalFunction.length > 0 ? (
                professionalFunction.map((func, index) => (
<MenuItem key={func.id_hours} value={{ id_hours: func.id_hours, id_professional: func.professional_id }}>
    <Checkbox 
        checked={hours.some(item => item.id_hours === func.id_hours && item.id_professional === func.professional_id)} 
    />
    <ListItemText 
        primary={`${func.professional_name} - ${func.speciality_name} - ${func.weekday} (${func.starttime}-${func.endtime})`} 
    />
</MenuItem>

                ))
            ) : (
                <MenuItem disabled>
                    Nenhuma função encontrada
                </MenuItem>
            )}
        </Select>
</FormControl>



            </Box>
            <Box sx={{padding:'1rem'}}>
                <TextField
                    multiline
                    label='Observações'
                    variant="outlined"
                    onChange={(e) => setObs(e.target.value)}
                    sx={{width:'40%'}}
                />
            </Box>
        </div>
    );
}