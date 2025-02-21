import axios  from "axios";
import Cookies from "js-cookie";


export const addBooking = async (booking: { email: string; date: string; propertyId: string}) => {
    try{
        console.log(`Details 02 : ${booking.email} | ${booking.date} | ${booking.propertyId}`)
        const data = {
            email: booking.email,
            date: booking.date
        }
        const axiosResponse = await axios.post(`http://127.0.0.1:3000/api/v1/user/bookVisit/${booking.propertyId}`, data);
        console.log(JSON.stringify(axiosResponse))
        return axiosResponse.data
    }catch (err){
        throw new Error(err.message);
    }
}
export const loginUserApi = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post('http://127.0.0.1:3000/api/user/login', credentials);
        // Extract user details
        const { user, accessToken, refreshToken } = response.data;

        // Remove existing cookies (if they exist)
        Cookies.remove("user_id");
        Cookies.remove("user_email");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        // Store user ID and email in cookies
        Cookies.set("user_id", user._id, { expires: 7, secure: true, sameSite: "Strict" });
        Cookies.set("user_email", user.email, { expires: 7, secure: true, sameSite: "Strict" });

        // Optionally store tokens
        Cookies.set("access_token", accessToken, { expires: 1, secure: true, sameSite: "Strict" });
        Cookies.set("refresh_token", refreshToken, { expires: 7, secure: true, sameSite: "Strict" });

        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
};