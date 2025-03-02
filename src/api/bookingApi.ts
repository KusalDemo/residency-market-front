import axios from "axios";
import { Booking } from "../types";
import ApiClient from "../util/ApiClient.ts";

// const BASE_URL = 'https://residencymarket.onrender.com/api';
 const BASE_URL = 'http://127.0.0.1:3000/api';

export const addBooking = async (booking: Booking) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.post("/booking/book", booking);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const getBookingsByUserId = async (userId: string) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.get(`/booking/getOwns/${userId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const getBookingsByResidencyId = async (residencyId: string) => {
    try {
        const axiosResponse = await axios.get(`${BASE_URL}/booking/get/${residencyId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const updateBooking = async (bookingId: string, booking: Partial<Booking>) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.put(`/booking/update/${bookingId}`, booking);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const cancelBooking = async (bookingId: string) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.delete(`/booking/delete/${bookingId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};