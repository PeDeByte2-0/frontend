import React from 'react';
import useAuth from '../hooks/useAuth';

const MenuLayout = ({ children }) => {
    useAuth(); // Aplica autenticação automaticamente

    return (
        <div>
            <header>
                <h1>Área Restrita</h1>
            </header>
            <main>{children}</main> {/* Renderiza o conteúdo específico da página */}
        </div>
    );
};

export default MenuLayout;