import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useLogout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('role');
        Cookies.remove('userId');
        navigate('/login')
        console.log('logout')
    }

    return handleLogout;
};