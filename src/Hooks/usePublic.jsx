import axios from "axios";

const usePublic = () => {
    const axiosPublic = axios.create({
        baseURL:'https://carecartserver.vercel.app'
    })
    return axiosPublic;
};

export default usePublic;