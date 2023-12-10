import React, { useState, useEffect } from 'react'
import styled from 'styled-components';



const FormularioProductos = ({ onAddProduct, onClose, editingProduct }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name);
            setDescription(editingProduct.description);
        }
    }, [editingProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            description,
        };
        onAddProduct(newProduct);
        setName('');
        setDescription('');
    };



    return (
        <StyledFormularioProductos>
            <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>
                    Descripción:
                </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <SubmitButton type="submit">
                        {editingProduct ? 'Guardar Cambios' : 'Agregar'}
                    </SubmitButton>
                    <CancelButton type="button" onClick={onClose}>
                        Cancelar
                    </CancelButton>
                </div>
            </form>
        </StyledFormularioProductos>
    );
};

export default FormularioProductos;


