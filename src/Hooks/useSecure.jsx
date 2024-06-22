import  axios  from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
const useAxiosSecure = axios.create({
    baseURL:'http://localhost:5000'
    // baseURL: 'https://carecartserver.vercel.app'
});
const useSecure = ()=>{
    const {handleLogOut} = useAuth();
    const navigate = useNavigate();
    useAxiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('jwt_token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
      
      useAxiosSecure.interceptors.response.use(function (response) {
        return response;
      }, async (error)=> {
        const status = error.response.status;
        if(status === 401 || status === 403){
            await handleLogOut();
            navigate('/login')
        }
        return Promise.reject(error);
      });
      return useAxiosSecure;
    
}
export default useSecure;