
import { Comment } from "../types";
import axios from "axios";
import ApiClient from "../util/ApiClient.ts";

const BASE_URL = 'http://127.0.0.1:3000/api';

export const getCommentsFromResidencyId = async (id: string) => {
    try {
        const axiosResponse = await axios.get(`${BASE_URL}/comment/get/${id}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const addComment = async (comment: Comment) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.post("/comment/create", comment);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const updateComment = async (commentId: string, comment: Comment) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.put(`/comment/update/${commentId}`, comment);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const deleteComment = async (commentId: string) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.delete(`/comment/delete/${commentId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const upvoteComment = async (commentId: string) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.put(`/comment/upvote/${commentId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const downvoteComment = async (commentId: string) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.put(`/comment/downvote/${commentId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};