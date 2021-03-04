import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const EditPotluck = props => {
    const [ formValues, setFormValues ] = useState({});
    const { potluckid, potluckData, toggleEdit, getPotluckData } = props;

    useEffect(() => {
        setFormValues(potluckData);
    },[]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .put(`/api/potlucks/${potluckid}`, { time: formValues.time, date: formValues.date, location: formValues.location })
        .then(res => {
            console.log(res);
            getPotluckData();
            toggleEdit(e);
        })
        .catch(err => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Potluck Info:</h2>
            <p><span>Location:</span> <input type='text' name='location' value={formValues.location} onChange={handleChange} /></p>
            <p><span>Date:</span> <input type='text' name='date' value={formValues.date} onChange={handleChange} /></p>
            <p><span>Time:</span> <input type='text' name='time' value={formValues.time} onChange={handleChange} /></p>
            <button>Submit</button>
        </form>
    )
};

export default EditPotluck
