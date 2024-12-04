import { AppBar, Box, IconButton, Tooltip } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
export default function MenuBar() {
    return (
        <AppBar 
        sx={{ height: '17%',  backgroundColor: '#61c7e7' }}
    >
        <Box 
            sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
        >
            <img 
                src='/apae.png' 
                style={{ width: '90px', height: '90px', display: 'block', margin: '10px 10px' }} 
                alt='Logo'
            >
            </img>
            <div 
                className="options" 
                style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
            >
                <Tooltip 
                    title="Página inicial"
                >
                    <IconButton 
                        aria-label="menu" 
                        size="large"
                         href="../menu/menu"
                    >
                        <HomeIcon 
                            fontSize="inherit" 
                            sx={{color:'#000000'}}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Agendamentos">
                    <IconButton aria-label="schedule" size="large" href="./schedule/schedule">
                        <EventIcon fontSize="inherit" sx={{color:'#000000'}}></EventIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip 
                    title="Profissionais"
                >
                    <IconButton 
                        aria-label="professionals" 
                        size="large" 
                        href="../professionals/professionals"
                    >
                        <GroupsIcon 
                            fontSize="inherit" 
                            sx={{color:'#000000'}}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip 
                    title="Alunos"
                >
                    <IconButton 
                        aria-label="students" 
                        size="large" 
                        href="../students/students"
                    >
                        <PersonIcon 
                            fontSize="inherit" 
                            sx={{color:'#000000'}}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip 
                    title="Sair"
                >
                    <IconButton 
                        aria-label="logout" 
                        size="large" 
                        href="../../"
                    >
                        <LogoutIcon 
                            fontSize="inherit" 
                            sx={{color:'#000000'}}
                        />
                    </IconButton>
                </Tooltip>
            </div>
        </Box>
    </AppBar>
    )
}