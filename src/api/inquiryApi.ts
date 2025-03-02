import axios from "axios";
import {Inquiry} from "../types";
import ApiClient from "../util/ApiClient.ts";

// const BASE_URL = 'https://residencymarket.onrender.com/api';
 const BASE_URL = 'http://127.0.0.1:3000/api';

export const addInquiry = async (inquiry: Inquiry) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.post("/inquiry/create", inquiry);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const getAllInquiriesByUserId = async (userId: string) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.get(`/inquiry/getUserInquiries/${userId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const getInquiriesByResidencyId = async (residencyId: string) => {
    try {
        const axiosResponse = await axios.get(`${BASE_URL}/inquiry/getResidencyInquiries/${residencyId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const addReplyToInquiry = async (inquiryId: string, reply: any) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.post(`/inquiry/addReply/${inquiryId}`, reply);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const updateInquiry = async (inquiryId: string, inquiry: Inquiry) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.put(`/inquiry/update/${inquiryId}`, inquiry);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const deleteInquiry = async (inquiryId: string) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.delete(`/inquiry/delete/${inquiryId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};