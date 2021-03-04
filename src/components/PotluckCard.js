import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FoodList from '../components/FoodList'

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

  useEffect(() => {
    axios
      .get(`https://tt-webft-32-potluck-planner.herokuapp.com/api/potlucks/${potluckid}`)
      .then(res => {
        console.log('Backend Data:', res);

        setPotluckData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const getLink = () => {
    return setInvite(window.location.href)
  }

  const copyLink = () => {
    const copiedLink = document.getElementById('invite')

    copiedLink.select();

    document.execCommand("copy");

    window.alert('Invite copied, send it to your friends!')
  }

  return (
    <>
      <main>
        <section className='card'>
          <h1>{potluckData.potluckname}</h1>

          <div className='food-items'>
            <h2>Potluck Info:</h2>
            <p><span>Location:</span> {potluckData.location}</p>
            <p><span>Date:</span> {potluckData.date}</p>
            <p><span>Time:</span> {potluckData.time}</p>

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