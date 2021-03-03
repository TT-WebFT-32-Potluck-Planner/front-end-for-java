import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

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
    const history = useHistory();
    const [success, setSuccess] = useState('');
    const [attendees, setAttendees] = useState([]);
    const potluckURL = `https://tt-webft-32-potluck-planner.herokuapp.com/api/potlucks/${potluckid}`

    useEffect(() => {
        axios
            .get(potluckURL)
            .then(res => {
                console.log(res.data);
                setPotluckData(res.data);
            })
            .catch(err => console.log(err));
        axios
            .get(`${potluckURL}/attendees`)
            .then(res => {
                console.log(res.data);
                setAttendees(res.data.map(attendee => attendee.userid.toString()));
            })
            .catch(err => console.log(err));
    },[]);

    const rsvp = e => {
        e.preventDefault();
        if (localStorage.getItem('token')) {
            axiosWithAuth()
                .post(`api/users/${userID}/potlucks/${potluckid}`)
                .then(setSuccess("You have successfully RSVP'd"))
                .catch(err => console.log(err));
        } else {
            history.push('/login');
        }
    };

    const routeToDashboard = e => {
        e.preventDefault();
        history.push('/dash')
    };

    const routeToPotluck = e => {
        e.preventDefault();
        history.push(`/potluck/${potluckid}`)
    };

    if (attendees.includes(userID)) {
        return (<div>
            <h3>You have already RSVP'd for this potluck!</h3>
            <button onClick={routeToPotluck}>Go To Potluck</button>
        </div>)
    }

    return (
        <div>
            <h1>Join my Potluck!</h1>
            <div className='invitation'>
                <p>What?: {potluckData.potluckname}</p>
                <p>When?: {potluckData.date}, {potluckData.time}</p>
                <p>Where?: {potluckData.location}</p>
                <p>Hosted by {potluckData.organizer}</p>
                {success || <button onClick={rsvp}>RSVP</button>}
                {success && <button onClick={routeToDashboard}>Go To Dashboard</button>}
                {success && <button onClick={routeToPotluck}>Go To Potluck</button>}
            </div>
        </div>
    )
}

export default Invite;
 