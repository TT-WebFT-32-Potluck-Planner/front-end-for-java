// import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FoodList from '../components/FoodList'
import EditPotluck from './EditPotluck';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const dummyData = {
  name: '',
  date: '',
  location: '',
  time: '',
  items: [],
  user: ''
}

const PotluckCard = () => {
  const [potluckData, setPotluckData] = useState(dummyData);
  const { potluckid } = useParams();
  const [invite, setInvite] = useState('')
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [edit, setEdit] = useState(false)

  const getPotluckData = () => {
    axiosWithAuth()
      .get(`/api/potlucks/potluckid/${potluckid}`)
      .then(res => {
        setPotluckData(res.data)
      })
      .catch(err => console.log(err.response.data));
  };

  useEffect(() => {
    axiosWithAuth()
    .get(`/api/potlucks/potluckid/${potluckid}`)
    .then(res => {
      setPotluckData(res.data)
      setIsOrganizer(localStorage.getItem('userID') === res.data.user.userid.toString())
    })
    .catch(err => console.log(err));
  }, [potluckid]);

  const getLink = () => {
    const baseURL = window.location.origin;
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
            {edit ? <EditPotluck potluckid={potluckid} potluckData={potluckData} toggleEdit={toggleEdit} getPotluckData={getPotluckData} /> :
              <>
                <h2>Potluck Info:</h2>
                <p><span>Location:</span> {potluckData.location}</p>
                <p><span>Date:</span> {potluckData.date}</p>
                <p><span>Time:</span> {potluckData.time}</p>
                <p><span>Hosted By:</span> {potluckData.user.username}</p>
                {isOrganizer ? <button onClick={toggleEdit}>Edit Details</button> : ''}
              </>
            }

            <h2>Food Items:</h2>
            <FoodList potluckid={potluckid} potluckData={potluckData} />

            <button onClick={getLink}>Invite Guests</button>

            {
              invite !== '' ?
                <textarea id='invite' value={invite} /> :
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