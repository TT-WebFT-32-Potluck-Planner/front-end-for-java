import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

const initalData = {
    potluckname: '',
    date: '',
    time: '',
    location: '',
    user: '',
    attendees: []
};

const Invite = () => {
    const { potluckid } = useParams();
    const [userID, setUserID] = useState('');
    const [potluckData, setPotluckData] = useState(initalData);
    const history = useHistory();
    const [success, setSuccess] = useState('');
    const [hostOrAttendee, setHostOrAttendee] = useState({host: false, attending: false});

    useEffect(() => {
        setUserID(parseInt(localStorage.getItem('userID'), 10));
        axios
            .get(`https://my-potluck-planner.herokuapp.com/api/potlucks/potluckid/${potluckid}`)
            .then(res => {
                setPotluckData(res.data);
            })
            .catch(err => console.log(err));

    },[potluckid]);

    useEffect(() => {
        const attendees = (potluckData.attendees.map(attendee => attendee.attendee.userid));
        setHostOrAttendee({
            host: userID === potluckData.user.userid,
            attending: attendees.includes(userID)
        })
    }, [potluckData, userID])

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

    return (
        <div className="invite-container">
            <h1>Join my Potluck!</h1>
            <div className='invitation'>
                <p>What?: {potluckData.potluckname}</p>
                <p>When?: {potluckData.date}, {potluckData.time}</p>
                <p>Where?: {potluckData.location}</p>
                <p>Hosted by {potluckData.user.username}</p>
                <div className="rsvp">
                    {
                        hostOrAttendee.host
                        ? <h3>You are the organizer of this potluck!</h3>
                        : ''
                    }
                    {
                        hostOrAttendee.attending
                        ? <h3>You already rsvp'd for this potluck!</h3>
                        : ''
                    }

                    {(!success && !hostOrAttendee.host && !hostOrAttendee.attending)
                        ? <button onClick={rsvp}>RSVP</button>
                        : ''
                    }
                    {success || (!hostOrAttendee.host || !hostOrAttendee.attending)
                        ? <>
                            <button onClick={routeToDashboard}>Go To Dashboard</button>
                            <button onClick={routeToPotluck}>Go To Potluck</button>
                        </>
                        : ''
                    }
                </div>
                <div>
                    {success}
                </div>


            </div>
        </div>

    )
        
}

export default Invite;
 