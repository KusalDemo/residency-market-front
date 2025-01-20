import axios  from "axios";


export const addBooking = async (booking: { email: string; date: string; propertyId: string}) => {
    try{
        console.log(`Details 02 : ${booking.email} | ${booking.date} | ${booking.propertyId}`)
        const data = {
            email: booking.email,
            date: booking.date
        }
        const axiosResponse = await axios.post(`http://127.0.0.1:8000/api/v1/user/bookVisit/${booking.propertyId}`, data);
        console.log(JSON.stringify(axiosResponse))
        return axiosResponse.data
    }catch (err){
        throw new Error(err.message);
    }
}