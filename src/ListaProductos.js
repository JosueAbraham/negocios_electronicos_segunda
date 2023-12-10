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
    margin-top: 60px;
    text-align: center;

    color: #0f0f0f;
    margin-bottom: 30px;
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
    background-color: #7c3e38;
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

const AñadirProductoBoton = styled.button`
    background-color: #408674;
    color: #fff;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 10px;
    margin-bottom: 20px; /* Espaciado inferior para separar del contenido siguiente */
    margin-left: 20px; /* Agregar margen al lado izquierdo */

    transition: background-color 0.3s ease;



    &:hover {
      background-color: #2a6d5c;
    }
`;


const ListaProductos = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddProduct = (product) => {
        if (editingProduct) {
            const updatedProducts = products.map((p) =>
                p.id === editingProduct.id ? { ...p, ...product } : p
            );
            setProducts(updatedProducts);
            setEditingProduct(null);
        } else {
            setProducts([...products, { id: Date.now(), ...product }]);
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
            <AñadirProductoBoton onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Hide Form' : 'Añadir producto'}
            </AñadirProductoBoton>
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
