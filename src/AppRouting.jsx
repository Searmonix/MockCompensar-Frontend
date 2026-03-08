import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MainPage from "./pages/template/MainPage";
import SideBar from "./pages/assets/SideBar";
import { AdminRoute, DoctorRoute, PatientRoute } from "./pages/auth/routing/ProtectedRouting";
import UserInfoFetch from "./pages/users/fetch/UserInfoFetch";
import NavBar from "./pages/assets/NavBar";
import LoginPage from "./pages/auth/LoginPage";
import AnamnesisFetch from "./pages/users/fetch/AnamnesisFetch";
import BookAppointment from "./pages/users/post/BookAppointment";
import Menu from "./pages/assets/Menu";
import RegistrationPage from "./pages/auth/RegistrationPage";


function AppRouting() {

    function GlobalTemplate() {
        return(
            <div>
                <NavBar />
                <MainPage />
                    <Outlet />
            </div>
        )
    }

    function AuthTemplate() {
        return(
            <div>
                <NavBar />
                <LoginPage />
                    <Outlet /> 
            </div>
        );
    }

    function AdminTemplate() {
        return(
            <div>
                <NavBar />
                <SideBar />
                    <Outlet />  
            </div>            
        );
    }

    function DoctorTemplate() {
        return(
            <div>
                <NavBar />
                <Menu />
                    <Outlet />  
            </div>            
        );
    }

    function PatientTemplate() {
        return(
            <div>
                <NavBar />
                <Menu />
                    <Outlet />  
            </div>            
        );
    }

    function AnamnesisSearchBarTemplate() {
        return(
            <div>
                <NavBar />
                <AnamnesisFetch />
                    <Outlet />  
            </div>   
        );
    }

    function AppointmentBookingTemplate() {
        return(
            <div>
                <NavBar />
                <BookAppointment />
                    <Outlet />  
            </div>   
        );
    }


    return(
        <Routes>
            {/* Global Routes */}
            <Route exact path="/home" element={<GlobalTemplate />} />
            <Route path="*" element={<Navigate to="/home" />} />

            {/* Auth Route */}
            {/* 
             * Acá podría crear una ruta específica para cada uno de los usuarios
             * Que cada tipo de usuario tenga una página de inicio de Sesión
             * Por ahora, no es necesario. 
             * En futuras versiones, tal vez demuestre ser una buena práctica
            */}
            <Route exct path="/auth/login" element={<AuthTemplate />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={ <AdminRoute element={<AdminTemplate />} />} >
                <Route path="find" element={<UserInfoFetch />} />
                <Route path="register" element={<RegistrationPage />} />
            </Route>

            {/* Doctor Routes */}
            <Route path="/doctor/menu" element={ <DoctorRoute element={<DoctorTemplate />} />} />
            <Route path="/doctor/menu/anamnesis" element={ <DoctorRoute element={<AnamnesisSearchBarTemplate />} />} />

            {/* Patient Routes */}
            <Route path="/patient/menu" element={ <PatientRoute element={<PatientTemplate />} />} /> 
            <Route path="/patient/menu/book" element={ <PatientRoute element={<AppointmentBookingTemplate />} />} /> 

        </Routes>
    );
}

export default AppRouting;