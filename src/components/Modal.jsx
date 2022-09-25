import { useState, useEffect } from 'react';

import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({ 
    setModal, 
    animarModal, 
    setAnimnarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
  }) => {

    
  //! STATE 
  const [ mensaje, setMensaje ] = useState('');
  const [ nombre, setNombre ] = useState('');
  const [ cantidad, setCantidad ] = useState('');
  const [ categoria, setCategoria ] = useState('');
  const [ fecha, setFecha ] = useState('');
  const [ id, setId ] = useState('');


  //! USE EFFECT 
  useEffect( () => {

    if( Object.keys(gastoEditar).length > 0 ){
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
    
  }, []);

  const ocultarModal = () => {
    setGastoEditar({})
    setAnimnarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 350);

  };


  /*  */
  const handleSubmit = ( e ) => {
    e.preventDefault();
    
    if([ nombre, cantidad, categoria ].includes('') || cantidad === 0 ){
      setMensaje('Todos los campos son obligatorios y la cantidad debe ser mayor a 0');

      setTimeout(() => {
        setMensaje('');
      }, 3000);

      return; 
    }

    guardarGasto({ nombre, cantidad, categoria, id, fecha });

  };


  return (

    <div className='modal'>
      <div className="cerrar-modal">
          <img 
            src={CerrarBtn} 
            alt="Cerrar Modal" 
            onClick={ocultarModal}
          />
      </div>

      <form onSubmit={ handleSubmit }
            className={`formulario ${ animarModal ? 'animar' : ''}`}
            action="">

        <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>
        { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }


        <div className="campo">
          <label htmlFor="nombre">Nombre del Gasto</label>

          <input 
            id='nombre'
            type="text" 
            placeholder='Añade el Nombde del Gasto'
            value={nombre}
            onChange={ e => setNombre(e.target.value)}
          />
        </div>


        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>

          <input 
            id='cantidad'
            type="number" 
            placeholder='Añade la cantidad total del gasto'
            value={cantidad}
            onChange={ e => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select 
            id="categoria"
            value={categoria}
            onChange={ e => setCategoria(e.target.value)}
          >

            <option value="">-- Seleccione --</option>
            <option value="ahorro"> Ahorro </option>
            <option value="comida"> Comida </option>
            <option value="casa"> Casa </option>
            <option value="gastos"> Gastos </option>
            <option value="ocio"> Ocio </option>
            <option value="salud"> Salud </option>
            <option value="suscripciones"> Suscripciones </option>
            
          </select>
        </div>
        <input type="submit" value={ gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto' }  />

      </form>



    </div>

  )
}

export default Modal