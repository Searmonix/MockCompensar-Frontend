import axios from "axios";

class UserService {

    static BASE_URL="http://localhost:8080"

    /*
        ---LOGIN & SIGN UP---
    */ 
    static async login(email, password) {
        
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password})
            return response.data;
            
        } catch (error) {
            throw error;
        }
    }

    static async signup(registerData, token) {

        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, registerData,
                { 
                    headers: {Authorization: `Bearer ${token}`}
                })
                return response.data;


        } catch (error) {   
            throw error;
        }
    }

    /* 
        ---USER SERVICES---

        Tengo que icluir los servicios de los demás, login, agendar cita, revisar perfil de Cliente o Doctor y revisar Anamnesis 
        Todos los servicios ya están creados en en BackEnd.
    */
    /* ADMIN - Encontrar usuario, junto con su tipo de usuario */
    static async getUserInfo(userUID, token){
        try {
            const response = await axios.get(`${UserService.BASE_URL}/users/find/${userUID}`, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                return response.data;

        } catch(err){
            throw err;
        }
    }

    static async getAnamnesis(userUID, token){
        try {
            const response = await axios.get(`${UserService.BASE_URL}/appointment/anamnesis/${userUID}`, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                return response.data;

        } catch(err){
            throw err;
        }
    }


    /*
        ---BOOKING---
    */ 
    static async bookAppointment(token, userUID, appointment) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/appointment/book/${userUID}`, appointment,  
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                return response.data;

        } catch(err){
            throw err;
        }
    }

    /*
        ---AUTHENTICATION---
    */ 
    static logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userUID');
    }

    static isAuthenticated() {
        
        const token = localStorage.getItem('token')
        return !!token
    }

    // Permite redirigir a recursos únicamente para ciertos roles
    static isAdmin() {
        
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isDoctor() {
        
        const role = localStorage.getItem('role');
        return role === 'DOCTOR';
    }

    static isPatient() {

        const role = localStorage.getItem('role');
        return role === 'PATIENT';
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }

    static doctorOnly() {
        return this.isAuthenticated() && this.isDoctor();
    }
}

export default UserService;