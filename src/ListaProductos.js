import React, { useState } from 'react'
import styled from 'styled-components';
import FormularioProductos from './FormularioProductos';

const StyledListaProductos = styled.div`
  max-width: 800px;
  margin: auto;
  text-align: center;

  h1 {
    color: #333;
    margin-bottom: 20px;
  }
`;

const TextoProductos = styled.h1`
    width: 100%;
    margin-top: 40px;
    text-align: center;

    color: #0f0f0f;
    margin-bottom: 50px;
`;


const Table = styled.table`
  width: 80%;
  margin: auto;
  text-align: center;
  margin-top: 30px;
  border-collapse: collapse;
  
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 15px;
    text-align: center;
    
  }

  th {
    background-color: #356961;
    color: #fff;
  }
`;


const ProductItem = styled.tr`
  td {
    padding: 15px;
    border: 1px solid #ddd;
    text-align: center;
  }
`;

const CenteredContainer = styled.div`
display: flex;
justify-content: left;
align-items: center;
margin-top: 20px; /* Adjust the margin as needed */
`;

const AñadirProductoBoton = styled.button`
    background-color: #DC7633;
    color: #fff;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 10px;
    margin-bottom: 20px; /* Espaciado inferior para separar del contenido siguiente */
    margin-left: 30px; /* Agregar margen al lado izquierdo */

    transition: background-color 0.3s ease;



    &:hover {
      background-color: #DC7633;
    }
`;



const ActionsContainer = styled.div`
  display: flex;
  justify-content: center; /* Centrar los botones horizontalmente */
//   margin-top: 8px; /* Espacio superior para separar del contenido superior */
//   flex-direction: column;
//  justify-content: space-between;
`;

const EliminarBoton = styled.button`
  background-color: #C7391A; /* Color rojo */
  color: #fff;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 8px; /* Agregar espacio a la izquierda */
//   margin-bottom: 5px; /* Espaciado inferior para separar los botones */
transition: background-color 0.3s ease;

  &:hover {
    background-color: #c90e0e;
  }
`;

const EditarBoton = styled.button`
  background-color: #D7CF0A; /* Color azul */
  color: #fff;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 8px; /* Agregar espacio a la derecha */
//   margin-bottom: 5px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #E7DF0E;
  }
`;




const ListaProductos = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  const handleAddProduct = (product) => {
    if (editingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? { ...p, ...product } : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      setProducts([...products, { id: idCounter, ...product }]);
      setIdCounter((prevCounter) => prevCounter + 1); // Incrementar el contador

    }

    setShowForm(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };


  return (
    <>
      <TextoProductos>Lista de productos</TextoProductos>
      <CenteredContainer>

        <AñadirProductoBoton onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Ocultar formulario' : 'Añadir producto'}

        </AñadirProductoBoton>
      </CenteredContainer>

      {showForm && (
        <FormularioProductos
          onAddProduct={handleAddProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          editingProduct={editingProduct}
        />
      )}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                <ActionsContainer>
                  <EditarBoton onClick={() => handleEditProduct(product)}>
                    Editar
                  </EditarBoton>
                  <EliminarBoton onClick={() => handleDeleteProduct(product.id)}>
                    Eliminar
                  </EliminarBoton>
                </ActionsContainer>
              </td>
            </ProductItem>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ListaProductos;
