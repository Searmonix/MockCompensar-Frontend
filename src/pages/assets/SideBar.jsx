import { NavLink } from "react-router-dom";

import "../template/static/css/SideBar.css";


const SideBar = () => {
    
    return(
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink to="/admin/dashboard/find" 
                        className={({isActive}) => {
                            return isActive ? 'active' : '';
                        }}>
                            Buscar Usuarios
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to="/admin/dashboard/register" 
                        className={({isActive}) => {
                            return isActive ? 'active' : '';
                        }}>
                            Registrar Usuario
                    </NavLink>
                </li>
            </ul>
        </div>
    ); 

}

export default SideBar;