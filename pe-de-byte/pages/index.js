import { Button, TextField, FormControl, InputLabel, InputAdornment, IconButton, FilledInput } from "@mui/material";
import { useRouter } from 'next/router';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Head from "next/head";


export default function Home() {
    const router = useRouter();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const isDisabled = login === '' || password === '';

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    // Verifica se o usuário já está autenticado
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            // Se o token existir, redireciona para /menu/menu
            router.push('/menu');
        }
    }, [router]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', { email: login, password: password });
            const { token } = response.data;
            console.log("Dados de login:" + login + "Senha:" + password);

            // Salva o token em um cookie
            Cookies.set('token', token, { expires: 1, secure: true });

            // Redireciona o usuário para a página inicial
            router.push('/menu');
        } catch (error) {
            setErrorMessage('Usuário ou senha inválidos');
            console.log(error)
        }
    };

    return (
        <div>
            <Head>
                <title>Pé de Byte 2.0</title>
            </Head>
            <AppBar 
                position="fixed"
                sx={{
                    height: {
                        xs: '30%',  // Para telas pequenas (xs)
                        sm: '30%'   // Para telas médias e maiores (sm)
                    },
                    backgroundColor: '#61c7e7',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 0',
                    boxShadow: 0
                }}
            >
                <img
                    src='/apae.png'
                    style={{ width: '150px', height: '150px' }}
                    alt='Logo'
                />
            </AppBar>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{
                    textAlign: 'center',
                    marginTop:{
                        xs: '100%',
                        sm: '20%'
                    }
                }}
            >
                Seja bem-vindo! Faça seu login
            </Typography>
            {errorMessage && (
                <Typography variant="body1" color="error" sx={{ textAlign: 'center', marginBottom: '10px' }}>
                    {errorMessage}
                </Typography>
            )}
            <TextField
                id="login"
                label="Login"
                variant="filled"
                sx={{
                    width: {
                        xs: '80%',  // Para telas pequenas (xs)
                        sm: '20rem' // Para telas médias e maiores (sm)
                    },
                    display: 'flex',
                    margin: '20px auto'
                }}
                onChange={(e) => setLogin(e.target.value)}
            />
            <FormControl
                sx={{
                    width: {
                        xs: '80%',  // Para telas pequenas (xs)
                        sm: '20rem' // Para telas médias e maiores (sm)
                    },
                    display: 'flex',
                    margin: '10px auto'
                }}
                variant="filled"
            >
                <InputLabel htmlFor="password">Senha</InputLabel>
                <FilledInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button
                id="submitLogin"
                variant="contained"
                size="large"
                onClick={handleLogin}
                startIcon={<LoginIcon />}
                sx={{
                    width: {
                        xs: '80%', // Para telas pequenas (xs)
                        sm: '10rem' // Para telas médias e maiores (sm)
                    },
                    display: 'flex',
                    margin: '20px auto'
                }}
                disabled={isDisabled}
            >
                Entrar
            </Button>
        </div>
    );
}
