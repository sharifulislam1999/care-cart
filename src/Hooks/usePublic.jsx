import axios from "axios";

const usePublic = () => {
    const axiosPublic = axios.create({
        baseURL:'http://localhost:5000'
    })
    return axiosPublic;
};

export default usePublic;