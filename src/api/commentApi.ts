import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000/api';

export const getCommentsFromResidencyId = async(id : string)=>{
    try{
        console.log(`getCommentsFromResidencyId : ${id}`)
        const axiosResponse = await axios.get(`${BASE_URL}/comment/get/${id}`);
        console.log(JSON.stringify(axiosResponse))
        return axiosResponse;
    }catch (error){
        console.log(`Error occured : ${error.message}`)
        throw new Error(error.message);
    }
}