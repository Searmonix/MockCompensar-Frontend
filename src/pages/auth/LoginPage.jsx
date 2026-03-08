import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

import "../template/static/css/LoginPage.css";


function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginData = await UserService.login(email, password);

            if (loginData.token) {
                localStorage.setItem('token', loginData.token);
                localStorage.setItem('userUID', loginData.userUID);
                localStorage.setItem('role', loginData.role);
                navigate('/home');
            } else {
                setError(loginData.message)
            }

        } catch (error) {

            console.log(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
            return error;
        }
    } 


        return (
            <div className="container">
                <h3 className="title">Bienvenido</h3>
                
                {error && <p className="error">{error}</p>}

                <form id="form" onSubmit={handleSubmit}>

                    <div className="field">
                        <label>Correo</label>
                        <input type="email" placeholder="Correo" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="field">
                        <label>Contraseña</label>
                        <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="login-btn">Ingresar</button>

                </form>
            </div>
        )
}

export default LoginPage;