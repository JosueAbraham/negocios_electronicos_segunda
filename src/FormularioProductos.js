import React, { useState, useEffect } from 'react'
import styled from 'styled-components';


const StyledFormularioProductos = styled.div`
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 800px;
  margin: auto;

  h2 {
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 16px;
      color: #333;
      margin-bottom: 8px;
    }

    input {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 16px;
      outline: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #007bff;
      }
    }
    }
`;


const SubmitButton = styled.button`
  background-color: #28a745; /* Color verde */
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 10px;
  align-self: flex-end; /* Mover el botón al extremo derecho */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;


const CancelButton = styled.button`
  background-color: #dc3545; /* Color rojo */
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 10px;
  align-self: flex-start; /* Mover el botón al extremo izquierdo */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;



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


