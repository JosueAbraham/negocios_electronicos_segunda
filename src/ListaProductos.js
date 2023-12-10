import React, { useState } from 'react'
import styled from 'styled-components';
import FormularioProductos from './FormularioProductos';



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
