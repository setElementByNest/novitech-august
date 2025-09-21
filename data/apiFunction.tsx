import axios from 'axios';

const url_fb = "https://farmboost-c9a0hnf6f7gzcdcy.southeastasia-01.azurewebsites.net/api/"

export const CreateFarm = async (name: string) => {
    try {
        const response = await axios.post(`${url_fb}farms/`, 
            {
                name: name
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};