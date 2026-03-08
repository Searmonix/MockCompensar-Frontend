import { NavLink, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

import logo from "../template/static/images/Compensar_logo.png";

function NavBar() {

    {/* 
        Según el estado de la sesión de usuario, y de sus permisos, nuevas opciones se le van a mostrar,
        en el NavBar, al igual que un cambio de color caracterísitico para el Administrador. 

        Necesito también cambiar en el CSS a, a Link o darle las mismas características
    */}
    const activeSession = UserService.isAuthenticated();
    const adminRegister = UserService.isAdmin();
    const doctorRegister = UserService.isDoctor();
    const patientRegister = UserService.isPatient();
    const navigate = useNavigate();

    const logoutOption = () => {

        const confirmDelete = window.confirm('Su sesión será cerrada');
        if (confirmDelete) {
            UserService.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {/* Logo Redirection */} 
                {!activeSession &&
                    <NavLink to="/home">
                        <img 
                            src={logo} 
                            alt="Compensar"
                        />
                    </NavLink>
                }

                {activeSession && adminRegister &&
                    <NavLink to="/admin/dashboard">
                        <img 
                            src={logo}
                            alt="Compensar"
                        />
                    </NavLink>
                }

                {activeSession && doctorRegister &&
                    <NavLink to="/doctor/menu">
                        <img 
                            src={logo}
                            alt="Compensar"
                        />
                    </NavLink>
                }

                {activeSession && patientRegister &&
                    <NavLink to="/patient/menu">
                        <img 
                            src={logo}
                            alt="Compensar"
                        />
                    </NavLink>
                }
            </div>           
            

            {/* NavBar Elements */} 
            <ul className="navbar-links">
            

                {/* First - Home */}
                <li><NavLink to="/home">Inicio</NavLink></li>


                {/* Second - User Specific Links */}
                {adminRegister &&
                    <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                }

                {doctorRegister &&
                    <li><NavLink to="/doctor/menu">Menu</NavLink></li>
                }

                {patientRegister &&
                    <li><NavLink to="/patient/menu">Menu</NavLink></li>
                }
                

                {/* Last - Home Page Login Dropdown Menu */}
                {/* 
                 * Es por el tiempo que me tomo desarrollar el Dropdown Menu que no lo descarto
                 * Por eso solo dejaré una opción.
                 * En futuras versiones se demostrará su utilidad, o lo contrario.
                */}
                {!activeSession &&
                    <li><NavLink to="/auth/login" className="login-btn">Iniciar Sesión</NavLink>
                        {/*
                        <div className="dropdown-menu">
                            <ul>
                                <li className="items"><Link to="../auth/clientlogin">Afiliado</Link></li>
                                <li className="items"><Link to="/auth/doctorlogin">Doctor</Link></li>
                                <li><NavLink to="/auth/login" className="last-utype">Admin</NavLink></li>
                            </ul>
                        </div>
                        */}
                    </li>
                }


                {/* Last - Logout */}
                {activeSession && <li><NavLink to="/home" onClick={logoutOption}>Cerrar Sesion</NavLink></li>}

            </ul>
        </nav>
    );
};

export default NavBar;