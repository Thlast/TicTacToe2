import React, { useState, useEffect } from 'react';

export const NextPlayer = ({ status }) => {
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        animacion()
    }, [status])
    const animacion = () => {

        setShowAnimation(true); // Activa la animación al cambiar el estado
        setTimeout(() => {
            setShowAnimation(false); // Desactiva la animación después de un tiempo
        }, 500); // Duración de la animación en milisegundos
    }

    //console.log(showAnimation)
    return (
        <div className={`next-player ${showAnimation ? 'animate' : ''}`}>
            {status}
        </div>
    );
};

