import axios from "axios";

const usePublic = () => {
    const axiosPublic = axios.create({
        // baseURL:'https://carecartserver.vercel.app'
        baseURL: 'https://carecartserver.vercel.app'
        // baseURL:
    })
    return axiosPublic;
};

export default usePublic;