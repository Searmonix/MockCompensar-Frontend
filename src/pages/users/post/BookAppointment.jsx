import { useState } from "react";
import DatePicker from 'react-datepicker';
import { useForm, Controller } from "react-hook-form";

import UserService from "../../../services/UserService";

import "react-datepicker/dist/react-datepicker.css";
import "../../template/static/css/BookAppointment.css"

function BookAppointment() {

    const { control, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm();

    const [appointmentUID, setAppointmentUID] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [appointmentDate, setAppointmentDate] = useState(null);

    const appointmentOptions = [
        "Pediatria",
        "Oncologia",
        "Urologia",
        "Cardiologia",
        "Psiquiatria",
        "Medicina_General"
    ];

    const [confirmationMessage, setConfirmationMessage] = useState(false);

    const confirmBooking = async () => {

        try {

            const date = new Date(appointmentDate);

            // 2026–02–28T15:43:14.361Z
            const dateFortmat = new Date(date).toISOString().split('T')[0];

            const appointment = {
                appointmentType: appointmentType,
                appointmentDate: dateFortmat
            };
            
            
            const token = localStorage.getItem('token');
            const userUID = localStorage.getItem('userUID')
            
            const response = await UserService.bookAppointment(token, userUID, appointment);

            if (response.statusCode === 200) {
                setAppointmentUID(response.appointmentUID)
                setConfirmationMessage(true);
                reset();
            }
            

        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <h3 className="appointment-title">Agenda tu Cita</h3>
            {confirmationMessage && (
                    <p className="succesful-booking-message">
                        Tu cita ha sido agendada. Su codigo es: {appointmentUID}
                    </p>
            )}
            <form onSubmit={handleSubmit(confirmBooking)}>
                <div className="type-container">
                    <Controller 
                        control={control}
                        name="appointmentType"
                        rules={{ required: "Selecciona un Tipo de Cita"}}
                        render={({ field }) => (
                            <select
                                onChange={(e) => {
                                    const type = e.target.value;    // Sin esto, llamo al Evento, no al valor
                                    field.onChange(type)
                                    setAppointmentType(type)
                                }}
                            >
                                <option value="" disabled hidden>Tipo de Cita</option>
                                {appointmentOptions.map((value) =>
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                )}
                            </select>
                        )}
                    />
                </div>
                
                {errors.appointmentType && (
                    <p className="form-field-error">{errors.appointmentType.message}</p>
                )}

                <div className="date-container">
                    <Controller 
                        control={control}
                        name="appointmentDate"
                        rules={{ required: "Selecciona una Fecha"}}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Selecciona una Fecha"
                                selected={field.value}
                                onChange={(date) => {
                                    field.onChange(date)
                                    setAppointmentDate(date)
                                }}  
                                dateFormat="yyyy-MM-dd"
                            />
                        )}
                    />
                </div>
                

                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Agendando Cita" : "Agendar Cita"}
                </button>
            </form>

        </div>
    );  
}

export default BookAppointment;