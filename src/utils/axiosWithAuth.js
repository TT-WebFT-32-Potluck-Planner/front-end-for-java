//Authroized copy of axios that pases login token in headers

import axios from 'axios';

export const axiosWithAuth = () => {
    const token = window.localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
         },
         baseURL: 'https://my-potluck-planner.herokuapp.com'
    });
};