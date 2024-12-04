import useAuth from '../../hooks/useAuth'; // Importe o hook de autenticação

const MenuLayout = ({ children }) => {
  useAuth(); // Aplica o hook em todas as páginas dentro de "/menu/*"

  return (
    <div>
      <h1>Menu</h1>
      <div>{children}</div> {/* Aqui será renderizado o conteúdo da página específica */}
    </div>
  );
};

export default MenuLayout;