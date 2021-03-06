import { axiosWithAuth } from '../utils/axiosWithAuth'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
  const [potlucks, setPotlucks] = useState([]);
  const [orgPotlucks, setOrgPotlucks] = useState([]);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    //checked by leah - good
    axiosWithAuth()
      .get(`api/users/${userID}/potlucks/attending`)
      .then(res => {
        setPotlucks(res.data)
      })
      .catch(err => console.log(err));

      //checked by leah - good
    axiosWithAuth()
      .get(`api/users/${userID}/potlucks`)
      .then(res => {
        setOrgPotlucks(res.data);
      })
      .catch(err => console.log(err));
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
              <div key={item.potluck.potluckid} id={item.potluck.potluckid} className='potluck-card-details' onClick={routeToPotluck}>
                <h2>{item.potluck.potluckname}</h2>
                <p><span>Date:</span> {item.potluck.date}</p>
                <p><span>Location:</span> {item.potluck.location}</p>
                <p><span>Time:</span> {item.potluck.time}</p>
              </div>
            )
          })}
        </div>
        <button onClick={routeToCreate}>Create New Potluck</button>
      </div>


    </div>
  )
}

export default Dashboard
