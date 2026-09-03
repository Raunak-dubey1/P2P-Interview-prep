import axios from "axios";

const axiosInstance=axios.create({
    BASE_URL:"http://localhost:3000/api",
    withCredentials:true,
})

export default axiosInstance;