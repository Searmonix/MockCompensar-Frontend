import { useState } from "react";
import UserService from "../../../services/UserService";

import "../../template/static/css/UserSearch.css"


function UserInfoFetch() {

    // Tiene que contener información de tipo String y puede aceptar valores vacíos
    const [userUID, setUserUID] =  useState('');

    // No puede mostrar información
    const [userInfo, setUserInfo] = useState(null);

    // No puede mostrar errores hasta que uno ocurra
    const [error, setError] = useState(null);

    const getUserInfo = async () => {
        // Si encuentra un valor vacío, regresa un error
        if (!userUID.trim()) {
            setError("Ingresa un Código de Usuario")
            setTimeout(() => setError(''), 5000)    // 5 segundos
        }

        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getUserInfo(userUID, token);

            setUserInfo(response.userInfoDTO)

        } catch (error) {
            console.error(error);
        }
    };
    
    return(
        <div>
            <h3 className="user-search-title">Buscar Usuario</h3>

            <div className="user-search-bar">
                <input
                    type="text"
                    placeholder="Ingrese el Código de Usuario"
                    value={userUID}
                    onChange={(e) => setUserUID(e.target.value)}
                />
                <button onClick={getUserInfo}>Buscar Usuario</button>
            </div>
            
            {error && <p className=".user-search-error">{error}</p>}
            
            {userInfo && (
                <div className="user-info">
                    <h2>Perfil de Usuario</h2>
                    <p>User ID: {userInfo.userUID}</p>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Role: {userInfo.role}</p>
                </div>
            )}   
        </div>  
    );
}

export default UserInfoFetch;