import axios from "axios";
import {Residency} from "../types";

const BASE_URL = 'http://127.0.0.1:3000/api'

export const fetchProperties = async () => {
    try{
        const axiosResponse = await axios.get(`${BASE_URL}/residency/`);
        console.log(`axiosResponse : ${JSON.stringify(axiosResponse)}`);
        return axiosResponse.data
    }catch (err){
        throw new Error(err.message);
    }
}

export const getResidencyById = async (id: string) => {
    try{
        const axiosResponse = await axios.get(`${BASE_URL}/residency/get/${id}`);
        console.log(`axiosResponse : ${JSON.stringify(axiosResponse)}`);
        return axiosResponse.data
    }catch (err){
        throw new Error(err.message);
    }
}

export const addProperty = async (property: Residency) => {
    try{
        console.log(`Residency to save : ${JSON.stringify(property)}`);
        const axiosResponse = await axios.post(`${BASE_URL}/residency/create`, property);
        console.log(`axiosResponse : ${JSON.stringify(axiosResponse)}`);
        return axiosResponse.data
    }catch (err){
        throw new Error(err.message);
    }
}