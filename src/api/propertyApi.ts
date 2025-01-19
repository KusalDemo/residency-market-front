import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export const fetchProperties = async () => {
    try{
        let axiosResponse = await axios.get(`${BASE_URL}/residency`);
        return axiosResponse.data
    }catch (err){
        throw new Error(err.message);
    }
}