import React from 'react'
import ListaProductos from './ListaProductos';
import styled from 'styled-components';

const AppContainer = styled.div`
  background-color: #fff; /* Color de fondo de toda la página */
  height: 100vh; /* Opcional: asegura que el contenedor ocupe toda la altura de la pantalla */
`;

const ContenedorTextoProductos = styled.div`
  padding-top: 20px; /* Ajusta el espacio superior según tus preferencias */
`;

const App = () => {
  return (
    <AppContainer>
      <ContenedorTextoProductos>
        <ListaProductos />
      </ContenedorTextoProductos>
    </AppContainer>
  );
};

export default App;