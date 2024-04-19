import React, { useState, useEffect } from "react";

export const Chat = ({socket}) => {
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");

    useEffect(() => {
        socket?.on("mensaje", (mensaje) => {
            setMensajes((mensajesAnteriores) => [...mensajesAnteriores, mensaje]);
        });
    
        return () => {
            socket?.off("mensaje");
        };
    }, [socket]);

    const enviarMensaje = (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        if (nuevoMensaje?.trim() !== "") { // Asegúrate de que el mensaje no esté vacío
            socket?.emit("mensaje", nuevoMensaje);
            setNuevoMensaje("");
        }
    };

    return (
        <div className="chat-container">
            <div className="mensajes-container">
                {mensajes?.map((mensaje, index) => (
                    <p key={index} className="mensaje">{mensaje.jugador}: {mensaje.mensaje}</p>
                ))}
            </div>
            <form onSubmit={enviarMensaje} className="input-container"> {/* Asigna enviarMensaje al onSubmit */}
                <input type="text" value={nuevoMensaje} onChange={(e) => setNuevoMensaje(e.target.value)} className="input-mensaje" />
                <button type="submit" className="enviar-btn">Enviar</button> {/* Cambia el onClick por type="submit" */}
            </form>
        </div>
    );
};
