import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FoodList from '../components/FoodList'
import EditPotluck from './EditPotluck';

const dummyData = {
  name: 'Jorge\'s Mars Sendoff Brunch',
  date: '04/24/2041',
  location: 'Earth',
  time: '12:00pm',
  claimedFood: [
    'Fettuccine Alfredo',
    'Grilled Chicken Sliders',
    'Turkey Pasta Casserole',
    'Applepie',
    'Raspberry Swirl Rolls',
    'Chocolate Cake'
  ],
  organizerid: ''
}

const PotluckCard = () => {
  const [potluckData, setPotluckData] = useState(dummyData);
  const { potluckid } = useParams();
  const [invite, setInvite] = useState('')
  const isOrganizer = localStorage.getItem('userID') === potluckData.organizerid.toString()
  const [edit, setEdit] = useState(false)
  
  const getPotluckData = () => {
    axios
    .get(`https://tt-webft-32-potluck-planner.herokuapp.com/api/potlucks/${potluckid}`)
    .then(res => setPotluckData(res.data))
    .catch(err => console.log(err.response.data));
  };

  useEffect(() => {
    getPotluckData();
  }, []);

  const getLink = () => {
    const fullURL = window.location.href;
    const baseURL = fullURL.substring(0, fullURL.length - 11)
    return setInvite(`${baseURL}/invite/${potluckid}`)
  }

  const copyLink = () => {
    const copiedLink = document.getElementById('invite')

    copiedLink.select();

    document.execCommand("copy");

    window.alert('Invite copied, send it to your friends!')
  }

  const toggleEdit = e => {
    e.preventDefault();
    setEdit(!edit);
  };

  return (
    <>
      <main>
        <section className='card'>
          <h1>{potluckData.potluckname}</h1>

          <div className='food-items'>
            {edit ? <EditPotluck potluckid={potluckid} potluckData={potluckData} toggleEdit={toggleEdit} getPotluckData={getPotluckData}/> :
              <>
              <h2>Potluck Info:</h2>
              <p><span>Location:</span> {potluckData.location}</p>
              <p><span>Date:</span> {potluckData.date}</p>
              <p><span>Time:</span> {potluckData.time}</p>
              { isOrganizer ? <button onClick={toggleEdit}>Edit Details</button> : ''}
              </>
            }

            <h2>Food Items:</h2>
           <FoodList potluckid={potluckid} potluckData={potluckData} /> 

            <button onClick={getLink}>Invite Guests</button>

            {
              invite !== '' ?
                <textarea id='invite'>{invite}</textarea> :
                null
            }

            {
              invite !== '' ?
                <button onClick={copyLink} id='copy'>Copy to Clipboard</button> :
                null
            }
          </div>
        </section>
      </main>
    </>
  )
}

export default PotluckCard