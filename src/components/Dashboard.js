import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PotluckCard from './PotluckCard';

const log = console.log;
const userID = localStorage.getItem('userID');
const Dashboard = () => {
  const [potlucks, setPotlucks] = useState([]);
  const [orgPotlucks, setOrgPotlucks] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`api/users/${userID}/potlucks`)
      .then(res => {
        log('API Data:', res.data)

        setPotlucks(res.data)
      })
      .catch(err => log(err));
      
      axiosWithAuth()
        .get(`api/users/${userID}/created`)
        .then(res => {
          log('Created Potluck Data: ', res.data)
          setOrgPotlucks(res.data);
      })
        .catch(err => log(err));
  }, [])

  const history = useHistory();

  const routeToCreate = () => {
    history.push('/create');
  };

  const routeToPotluck = e => {
    history.push(`/potluck/${e.currentTarget.id}`)
  };


  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>

      {log('Potluck State:', potlucks)}
      
      <div className='dashboard'>
        <h2>Potlucks Organized by You</h2>
        <div className='potluck-card'>
          {orgPotlucks.map(item => {
            return (
              <div key={item.potluckid} id={item.potluckid} className='potluck-card-details' onClick={routeToPotluck}>
                <h2>{item.potluckname}</h2>
                <p><span>Date:</span> {item.date}</p>
                <p><span>Location:</span> {item.location}</p>
                <p><span>Time:</span> {item.time}</p>
              </div>
            )
          })}
          </div>
          <h2>Potlucks You're Attending</h2>
          <div className='potluck-card'>
          {potlucks.map(item => {
            return (
              <div key={item.potluckid} id={item.potluckid} className='potluck-card-details' onClick={routeToPotluck}>
                <h2>{item.potluckname}</h2>
                <p><span>Date:</span> {item.date}</p>
                <p><span>Location:</span> {item.location}</p>
                <p><span>Time:</span> {item.time}</p>
              </div>
            )
          })}
          </div>
        <button onClick={routeToCreate}>Create New Potluck</button>
        <PotluckCard />
      </div>


    </div>
  )
}

export default Dashboard
