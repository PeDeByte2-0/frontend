import MenuLayout from './layouts/MenuLayout';

function MyApp({ Component, pageProps, router }) {
    // Verifica se a rota começa com "/menu"
    const isMenuRoute = router.pathname.startsWith('/menu');

    if (isMenuRoute) {
        return (
            <MenuLayout>
                <Component {...pageProps} />
            </MenuLayout>
        );
    }

    // Rotas fora de "/menu" não usam o layout
    return <Component {...pageProps} />;
}

export default MyApp;