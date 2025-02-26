import axios from "axios";
import {Residency} from "../types";
import ApiClient from "../util/ApiClient.ts";

const BASE_URL = 'http://127.0.0.1:3000/api'

export const fetchProperties = async () => {
    try {
        const axiosResponse = await axios.get(`${BASE_URL}/residency/`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const getResidencyById = async (id: string) => {
    try {
        const axiosResponse = await axios.get(`${BASE_URL}/residency/get/${id}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const fetchPropertiesByUserId = async (id: string) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.get(`/residency/getOwns/${id}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const addProperty = async (property: Residency) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.post("/residency/create", property);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const updateProperty = async (propertyId: string, property: Residency) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.put(`/residency/update/${propertyId}`, property);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};

export const deleteProperty = async (propertyId: string) => {
    try {
        const axiosInstance = ApiClient.getAxiosInstance();
        const axiosResponse = await axiosInstance.delete(`/residency/delete/${propertyId}`);
        return axiosResponse.data;
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        throw new Error(error.message);
    }
};