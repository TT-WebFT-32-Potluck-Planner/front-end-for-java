import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initalData = {
    potluckname: '',
    date: '',
    time: '',
    location: ''
};

const Invite = () => {
    const { potluckid } = useParams();
    const userID = localStorage.getItem('userID');
    const [potluckData, setPotluckData] = useState(initalData);

    useEffect(() => {
        axiosWithAuth()
            .get(`api/potlucks/${potluckid}`)
            .then(res => {
                console.log(res.data);
                setPotluckData(res.data);
            })
            .catch(err => console.log(err));
    },[]);

    return (
        <div>
            <h1>Join my Potluck!</h1>
            <p>What?: {potluckData.potluckname}</p>
            <p>When?: {potluckData.date}, {potluckData.time}</p>
            <p>Where?: {potluckData.location}</p>
            <p>Hosted by {potluckData.organizer}</p>
            <button>RSVP</button>
        </div>
    )
}

export default Invite;
 