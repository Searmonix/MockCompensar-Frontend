import { useState } from "react";

import UserService from "../../../services/UserService";

import "../../template/static/css/AnamnesisSearch.css"


function AnamnesisFetch() {

    const [userUID, setUserUID] = useState('');
    const [anamnesis, setAnamnesis] =  useState(null);
    const [error, setError] = useState(null);

    const getAnamnesis = async () => {

        if (!userUID.trim()) {
            setError("Ingresa un Código de Usuario")
            setTimeout(() => setError(''), 5000)    // 5 segundos
        }

        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getAnamnesis(userUID, token)

            setAnamnesis(response.anamnesis)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h3 className="amanmesis-search-title">Buscar Historial Medico</h3>

            <div className="amanmesis-search-bar ">
                <input
                    type="text"
                    placeholder="Ingrese el Código de Usuario"
                    value={userUID}
                    onChange={(e) => setUserUID(e.target.value)}
                />
                <button onClick={getAnamnesis}>Buscar Historial Medico del Usuario</button>
            </div>

            {error && <p className="anamnesis-search-error">{error}</p>}

            {anamnesis && (
                <table className="anamnesis-table">
                    <thead>
                        <tr>    
                            <th>Appointment_UID</th>
                            <th>Appointment_Date</th>
                            <th>Appointment_Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {anamnesis.appointments.map((element, index) => (
                        <tr key={index}>
                            <td>{element.appointmentUID}</td>
                            <td>{element.appointmenDate}</td>
                            <td>{element.appointmentType}</td>
                            <td>{element.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
      
    );
}

export default AnamnesisFetch;