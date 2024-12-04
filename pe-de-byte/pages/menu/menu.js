import * as React from 'react';
import { Box, IconButton, Tooltip } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';


export default function Menu() {

    return (
        <div>
            <AppBar sx={{ height: '17%',  backgroundColor: '#61c7e7' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
				    <img src='/apae.png' style={{ width: '90px', height: '90px', display: 'block', margin: '10px 10px' }} alt='Logo'></img>
                    <div className="options" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Página inicial">
                            <IconButton aria-label="menu" size="large" href="./menu">
                                <HomeIcon fontSize="inherit" sx={{color:'#000000'}}></HomeIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Agendamentos">
                            <IconButton aria-label="schedule" size="large" href="./schedule/schedule">
                                <EventIcon fontSize="inherit" sx={{color:'#000000'}}></EventIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Profissionais">
                            <IconButton aria-label="professionals" size="large" href="./professionals/professionals">
                                <GroupsIcon fontSize="inherit" sx={{color:'#000000'}}></GroupsIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Alunos">
                            <IconButton aria-label="students" size="large" href="./students/students">
                                <PersonIcon fontSize="inherit" sx={{color:'#000000'}}></PersonIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Sair">
                            <IconButton aria-label="logout" size="large" href="../">
                                <LogoutIcon fontSize="inherit" sx={{color:'#000000'}}></LogoutIcon>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Box>
			</AppBar>
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
                    <IconButton aria-label="viewProfessionals" size="large" href="./professionals/professionals" sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
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
                    <IconButton aria-label="viewStudents" size="large" href="./students/students" sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
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
                    <IconButton aria-label="viewSchedule" size="large" href="./schedule/schedule" sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <VisibilityIcon fontSize="inherit" sx={{color:'#000000'}}></VisibilityIcon>
                    </IconButton>
                </Tooltip>
            </Box>
        </CardContent>
    </React.Fragment>
);