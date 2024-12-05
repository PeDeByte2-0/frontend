import * as React from 'react';
import { Box, IconButton, Tooltip } from "@mui/material";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import VisibilityIcon from '@mui/icons-material/Visibility';

import MenuBar from '../../components/menuBar';


export default function Menu() {

    return (
        <div>
            <MenuBar />
            <Typography variant="h5" gutterBottom sx={{ margin:'10% 10% 5% 10%' }}>
				Olá! Seja bem-vindo ao menu
			</Typography>
            <Card variant="outlined" sx={{ backgroundColor:'#c5ecf8', margin:'10px 10px' }}>{cardProfessionals}</Card>
            <Card variant='outlined' sx={{ backgroundColor:'#c5ecf8', margin:'10px 10px' }}>{cardStudents}</Card>
            <Card variant='outlined' sx={{ backgroundColor:'#c5ecf8', margin:'10px 10px' }}>{cardSchedule}</Card>
        </div>
    );
}

const cardProfessionals = (
    <React.Fragment>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>                
                <Typography variant='h5'>Veja uma lista de profissionais e suas agendas para planejar as próximas consultas conforme sua disponibilidade</Typography>
                <Tooltip title="Veja os Profissionais">
                    <IconButton aria-label="viewProfessionals" size="large" href="./menu/professionals" sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <VisibilityIcon fontSize="inherit" sx={{color:'#000000'}}></VisibilityIcon>
                    </IconButton>
                </Tooltip>
            </Box>
        </CardContent>
    </React.Fragment>
);

const cardStudents = (
    <React.Fragment>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>                
                <Typography variant='h5'>Confira os atendimentos pelas agendas dos alunos para planejar suas próximas consultas</Typography>
                <Tooltip title="Veja os Alunos">
                    <IconButton aria-label="viewStudents" size="large" href="./menu/students" sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <VisibilityIcon fontSize="inherit" sx={{color:'#000000'}}></VisibilityIcon>
                    </IconButton>
                </Tooltip>
            </Box>
        </CardContent>
    </React.Fragment>
);

const cardSchedule = (
    <React.Fragment>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>                
                <Typography variant='h5'>Acesse todos os agendamentos marcados para a sua instituição</Typography>
                <Tooltip title="Veja os Agendamentos">
                    <IconButton aria-label="viewSchedule" size="large" href="./menu/schedule" sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <VisibilityIcon fontSize="inherit" sx={{color:'#000000'}}></VisibilityIcon>
                    </IconButton>
                </Tooltip>
            </Box>
        </CardContent>
    </React.Fragment>
);