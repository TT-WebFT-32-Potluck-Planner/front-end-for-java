//Form for creating a potluck
import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialValues = { 
    potluckname: '',
    date: '',
    time: '', 
    location: ''
};

const CreatePotluck = () => {
    const [ formValues, setFormValues ] = useState(initialValues);
    const userID = '2';

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .post(`/api/users/${userID}/potlucks`, formValues)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create Potluck</h2>
                <label>
                    Potluck Name
                    <input type='text' name='potluckname' value={formValues.potluckname} onChange={handleChange}/>
                </label>
                <label>
                    Date
                    <input type='text' name='date' value={formValues.date} onChange={handleChange}/>
                </label>
                <label>
                    Time
                    <input type='text' name='time' value={formValues.time} onChange={handleChange}/>
                </label>
                <label>
                    Location 
                    <input type='text' name='location' value={formValues.location} onChange={handleChange}/>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
};

export default CreatePotluck;