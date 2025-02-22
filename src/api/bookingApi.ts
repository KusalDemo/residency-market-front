import axios from "axios";
import { Booking } from "../types";

const BASE_URL = 'http://127.0.0.1:3000/api';

export const addBooking = async (booking: Booking) => {
    try {
        const axiosResponse = await axios.post(`${BASE_URL}/booking/book`, booking);
        return axiosResponse.data;
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(error.message);
    }
};

export const getBookingsByUserId = async (userId: string) => {
    try {
        const axiosResponse = await axios.get(`${BASE_URL}/booking/getOwns/${userId}`);
        return axiosResponse.data;
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(error.message);
    }
};

export const getBookingsByResidencyId = async (residencyId: string) => {
    try {
        const axiosResponse = await axios.get(`${BASE_URL}/booking/get/${residencyId}`);
        return axiosResponse.data;
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(error.message);
    }
};

export const updateBooking = async (bookingId: string, booking: Partial<Booking>) => {
    try {
        const axiosResponse = await axios.put(`${BASE_URL}/booking/update/${bookingId}`, booking);
        return axiosResponse.data;
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(error.message);
    }
};

export const cancelBooking = async (bookingId: string) => {
    try {
        const axiosResponse = await axios.delete(`${BASE_URL}/booking/delete/${bookingId}`);
        return axiosResponse.data;
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(error.message);
    }
};