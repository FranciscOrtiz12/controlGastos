import { useState, useEffect } from 'react'

import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'

import { generarId, formatearDate } from './helpers'

import IconoNuevoGasto from './img/nuevo-gasto.svg';


function App() {

  //! STATE
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  ); //? Asignar presupuesto
  const [ gastos, setGastos ] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  ); //? lista de gastos?
  const [isValidPresupuesto, setIsValidPresupuesto ] = useState(false); //? Validar el presupuesto
  const [modal, setModal] = useState(false); //? Mostrar modal
  const [animarModal, setAnimnarModal] = useState(false); //? Mostrar animacion del modal
  const [gastoEditar, setGastoEditar ] = useState({});

  const [filtro, setFiltro ] = useState('');
  const [gastosFiltrados, setGastosFiltrados ] = useState([]);

  //! USE EFFECT  
  useEffect( () => {
    if( Object.keys(gastoEditar).length > 0 ){
      setModal(true);

      setTimeout(() => {
        setAnimnarModal(true);
      }, 50);
    }
  }, [ gastoEditar ]);


  useEffect( () => {
    localStorage.setItem( 'presupuesto', presupuesto ?? 0 ) // en caso de que no tengamos presupuesto le damos un 0
  }, [presupuesto])


  useEffect( () => {
    localStorage.setItem( 'gastos', JSON.stringify(gastos) ?? [] ) // en caso de que no tengamos presupuesto le damos un 0
  }, [gastos])


  useEffect( () => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0);
    if( presupuestoLS > 0 ){
      setIsValidPresupuesto(true);
    }
  }, [])


  useEffect( () => {
    if(filtro){
      // Filtrar gastos por categoria seleccionada
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro] )


  //! FIUNCIONES
  //? Para añadir nuevo gasto y levantar modal
  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimnarModal(true);
    }, 50);
  };


  //? Guardar el nuevo gasto
  const guardarGasto = gasto => {

    if( gasto.id ){

      //* ACTUALIZAR GASTO  
      // actualizamos el gasto del state
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState );
      setGastos(gastosActualizados);
    }else{

      //* NUEVO GASTO
      gasto.id = generarId(); //? Le agregamos un id unico al gasto
      gasto.fecha = formatearDate( Date.now() );
      setGastos( [ ...gastos, gasto ] );
      setGastoEditar({});
    }

    setAnimnarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 350);
  };


  const eliminarGasto = id => {
    //Se trae todos los gastos diferentes al id que le estamos pasando
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id ); 
    setGastos(gastosActualizados);
  };


  return (
    <div className={ modal ? 'fijar' : '' }>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      { isValidPresupuesto && (
        <>  
          <main>

            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto} 
              alt="Icono de Nuevo Gasto" 
              onClick={handleNuevoGasto}
            />
          </div>    
        </>
      )}

      { modal && <Modal 
                  setModal={setModal}
                  animarModal={animarModal} 
                  setAnimnarModal={setAnimnarModal} 
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}
    
    </div>
  )
}

export default App
