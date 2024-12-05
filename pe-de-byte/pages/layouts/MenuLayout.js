import React from 'react';
import useAuth from '../hooks/useAuth';

const MenuLayout = ({ children }) => {
    useAuth(); // Aplica autenticação automaticamente

    return (
        <div>
            <header>
                
            </header>
            <main>{children}</main> {/* Renderiza o conteúdo específico da página */}
        </div>
    );
};

export default MenuLayout;