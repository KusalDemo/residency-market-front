import axios from "axios";
import {Inquiry} from "../types";

const BASE_URL = 'http://127.0.0.1:3000/api';

export const addInquiry = async (inquiry: Inquiry) => {
    try {
        const axiosResponse = await axios.post(`${BASE_URL}/inquiry/create`, inquiry);
        return axiosResponse.data;
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(error.message);
    }
};

export const getAllInquiriesByUserId = async (userId: string) => {
    try {
        console.log(`userId : ${userId} | ${BASE_URL}/inquiry/getUserInquiries/${userId}`)
        const axiosResponse = await axios.get(`${BASE_URL}/inquiry/getUserInquiries/${userId}`);
        return axiosResponse.data;
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(error.message);
    }
};

export const getInquiriesByResidencyId = async (residencyId: string) => {
    try {
        const axiosResponse = await axios.get(`${BASE_URL}/inquiry/getResidencyInquiries/${residencyId}`);
        return axiosResponse.data;
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(error.message);
    }
};

export const addReplyToInquiry = async (inquiryId: string, reply: any) => {
    try {
        const axiosResponse = await axios.post(`${BASE_URL}/inquiry/addReply/${inquiryId}`, reply);
        return axiosResponse.data;
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(error.message);
    }
};