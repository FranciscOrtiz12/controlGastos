import {  useState, useEffect } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

import { cantidadToCLP } from '../helpers';



const ControlPresupuesto = ({ 
    presupuesto, 
    setPresupuesto, 
    setGastos,
    gastos,
    setIsValidPresupuesto
}) => {

    //! STATE
    const [ porcentaje, setPorcentaje ] = useState(0);
    const [ disponible, setDisponible ] = useState(presupuesto);
    const [ gastado, setGastado ] = useState(0);


    //! EFFECT
    useEffect( () => {
        const totalGastado = gastos.reduce( ( total, gasto ) => gasto.cantidad + total, 0 )


        // Calcular el porcentaje gastado para mostrarlo en el grafico
        let totalDisponible = presupuesto - totalGastado
        const newPorcentaje = ( ((presupuesto - totalDisponible) / presupuesto )  * 100).toFixed(2);
        setTimeout(() => {
            setPorcentaje(newPorcentaje);
        }, 400);

        setGastado(totalGastado);
        setDisponible( (presupuesto - totalGastado) );
    }, [gastos])


    //! FUNCIONES
    const handleResetApp = () => {
        const result = confirm('¿Desea reuniciar el presupuesto y los gastos?');
        if( result ) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }
    

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                value={porcentaje} //progreso
                text={`${porcentaje}% Gastado`}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6'
                })}

            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {`${cantidadToCLP(presupuesto)}`}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {`${cantidadToCLP(disponible)}`}
            </p>
            <p>
                <span>Gastado: </span> {`${cantidadToCLP(gastado)}`}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto