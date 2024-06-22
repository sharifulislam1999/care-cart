import axios from "axios";

const usePublic = () => {
    const axiosPublic = axios.create({
        // baseURL:'https://carecartserver.vercel.app'
        // baseURL: 'https://carecartserver.vercel.app'
        baseURL:'http://localhost:5000'
    })
    return axiosPublic;
};

export default usePublic;