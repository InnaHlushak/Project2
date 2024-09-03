import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.nasa.gov", 
   
    //вказати, що відповідь отримуємо у форматі JSON
    headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;