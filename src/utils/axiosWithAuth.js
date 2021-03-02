//Authroized copy of axios that pases login token in headers
import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    console.log('Token: ', token);
    return axios.create({
        headers: {
            Authorization: token,
         },
         baseURL: 'https://tt-webft-32-potluck-planner.herokuapp.com'
    });
};