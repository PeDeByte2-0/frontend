import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/'); // Redireciona para o login
        }
    }, [router]);
};

export default useAuth;