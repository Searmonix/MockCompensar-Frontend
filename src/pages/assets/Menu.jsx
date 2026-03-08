import { NavLink } from "react-router-dom";
import UserService from "../../services/UserService";

import "../template/static/css/Menu.css";


function Menu() {

    const doctorRegister = UserService.isDoctor();
    const patientRegister = UserService.isPatient();

    return(
        <div className="usr-main-menu">
            <h1>Menu Principal</h1>

            {doctorRegister &&
                <li><NavLink to="/doctor/menu/anamnesis" className="redirect-btn">Historial Medico</NavLink></li>
            }

            {patientRegister &&
                <li><NavLink to="/patient/menu/book" className="redirect-btn">Agenda tu Cita</NavLink></li>
            }    
        </div>
    );
}

export default Menu;