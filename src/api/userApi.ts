import axios from 'axios';
import Cookies from 'js-cookie';

export const loginUserApi = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post('http://127.0.0.1:3000/api/user/login', credentials);
        const { user, accessToken, refreshToken } = response.data;

        // Store user details in cookies
        Cookies.set('user_id', user._id, { expires: 7, secure: true, sameSite: 'Strict' });
        Cookies.set('user_email', user.email, { expires: 7, secure: true, sameSite: 'Strict' });
        Cookies.set('access_token', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
        Cookies.set('refresh_token', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });

        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const registerUserApi = async (userData: { name: string; email: string; password: string }) => {
    try {
        const response = await axios.post('http://127.0.0.1:3000/api/user/register', userData);
        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
};