import axios from "axios";
import {Residency} from "../types";

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export const fetchProperties = async () => {
    try{
        let axiosResponse = await axios.get(`${BASE_URL}/residency`);
        return axiosResponse.data
    }catch (err){
        throw new Error(err.message);
    }
}

export const addProperty = async (property: Residency) => {
    try{
        console.log(`Residency to save : ${JSON.stringify(property)}`);
        const axiosResponse = await axios.post(`${BASE_URL}/residency/create`, { data: property });
        console.log(`axiosResponse : ${JSON.stringify(axiosResponse)}`);
        return axiosResponse.data
    }catch (err){
        throw new Error(err.message);
    }
}