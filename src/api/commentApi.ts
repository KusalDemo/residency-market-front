import axios from 'axios';
import {Comment} from "../types";

const BASE_URL = 'http://127.0.0.1:3000/api';

export const getCommentsFromResidencyId = async(id : string)=>{
    try{
        const axiosResponse = await axios.get(`${BASE_URL}/comment/get/${id}`);
        return axiosResponse;
    }catch (error){
        console.log(`Error occured : ${error.message}`)
        throw new Error(error.message);
    }
}

export const addComment = async (comment:Comment) => {
    try {
        const axiosResponse = await axios.post(`${BASE_URL}/comment/create`, comment);
        return axiosResponse.data;
    } catch (error) {
        console.log(`Error occured : ${error.message}`)
        throw new Error(error.message);
    }
}

export const updateComment = async (commentId: string, comment: Comment) => {
    try {
        const axiosResponse = await axios.put(`${BASE_URL}/comment/update/${commentId}`, comment);
        return axiosResponse.data;
    } catch (error) {
        console.log(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const deleteComment = async (commentId: string) => {
    try {
        const axiosResponse = await axios.delete(`${BASE_URL}/comment/delete/${commentId}`);
        return axiosResponse.data;
    } catch (error) {
        console.log(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const upvoteComment = async (commentId: string) => {
    try {
        console.log(`commentId : ${commentId} | ${BASE_URL}/comment/upvote/${commentId}`)
        const axiosResponse = await axios.put(`${BASE_URL}/comment/upvote/${commentId}`);
        return axiosResponse.data;
    } catch (error) {
        console.log(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const downvoteComment = async (commentId: string) => {
    try {
        const axiosResponse = await axios.put(`${BASE_URL}/comment/downvote/${commentId}`);
        return axiosResponse.data;
    } catch (error) {
        console.log(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};