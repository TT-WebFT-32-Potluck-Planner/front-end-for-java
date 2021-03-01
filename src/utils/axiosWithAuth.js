//Authroized copy of axios that pases login token in headers
import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        headers: {
            Authorization: token
         },
         baseURL: 'http://tt-web-32-potluck-planner.herokuapp.com'
    });
};