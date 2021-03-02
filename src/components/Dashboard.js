import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const log = console.log

const Dashboard = () => {
  const [potlucks, setPotlucks] = useState([])

  useEffect(() => {
    axios
      .get(`https://tt-webft-32-potluck-planner.herokuapp.com/api/potlucks`)
      .then(res => {
        log('API Data:', res.data)

        setPotlucks(res.data)
      })
      .catch(err => log(err))
  }, [])

  const history = useHistory();

  const routeToCreate = () => {
    history.push('/create');
  };


  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>

      {log('Potluck State:', potlucks)}

      <div className='potluck-card'>
        {potlucks.map(item => {
          return (
            <div key={item.organizerid}>
              <h2>Potluck Information:</h2>
              <p><span>Name:</span> {item.potluckname}</p>
              <p><span>Date:</span> {item.date}</p>
              <p><span>Location:</span> {item.location}</p>
              <p><span>Time:</span> {item.time}</p>
            </div>
          )
        })}
        <button onClick={routeToCreate}>Create New Potluck</button>
      </div>


    </div>
  )
}

export default Dashboard
