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