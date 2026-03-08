import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import UserService from '../../services/UserService';

import "../template/static/css/Registration.css"

function RegistrationPage() {


    const { control, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm();

    const [userUID, setUserUID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    // Esto es un peligro, debería ser un método en el Back
    const userRoles = [
        "ADMIN",
        "DOCTOR",
        "PATIENT"
    ]

    const [confirmationMessage, setConfirmationMessage] = useState(false);

    const createUser = async () => {

        try {

            const user = {
                name: name,
                email: email,
                password: password,
                role: role
            }

            const token = localStorage.getItem('token');

            const response = await UserService.signup(user, token);

            if (response.statusCode === 200) {
                setUserUID(response.userUID)
                setConfirmationMessage(true);

                reset();
            }


        } catch (error) {
            console.error("Error al Registrar Usuario: ". error);
            alert("Un error ocurrió al Registrar el Usurio");
        }
    }

    return (
        <div className="container">
            <h3 className="title">Registrar Usuario</h3>
            {confirmationMessage && (
                    <p className="succesful-registering-message">
                        Un {role} ha sido creado, su código es: {userUID}
                    </p>
            )}

            <form onSubmit={handleSubmit(createUser)}>
                <input 
                    onChange={(e) => {
                        const name = e.target.value;
                        setName(name)
                    }}
                    required
                    type='text' 
                    placeholder='Nombre'
                />
                <input 
                    onChange={(e) => {
                        const email = e.target.value;
                        setEmail(email)
                    }}
                    required
                    type='email' 
                    placeholder='Correo' 
                />
                <input 
                    onChange={(e) => {
                        const password = e.target.value;
                        setPassword(password)
                    }}
                    required
                    type='password' 
                    placeholder='Contraseña' 
                />
                <Controller 
                    control={control}
                    name="role"
                    rules={{ required: "Selecciona un Rol de Usuario"}}
                    render={({ field }) => (
                        <select
                            onChange={(e) => {
                                const role = e.target.value;    // Sin esto, llamo al Evento, no al valor
                                field.onChange(role)
                                setRole(role)
                            }}
                        >
                            <option value="" disabled hidden>Roles de Usuario</option>
                            {userRoles.map((value) =>
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            )}
                        </select>
                    )}
                />
                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Registrando Usuario" : "Registrar Usuario"}
                </button>
            </form>

        </div>
    );

}

export default RegistrationPage;