import React, { useState } from 'react'

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
  ]
}

const PotluckCard = () => {
  return (
    <>
      <main>
        <section className='card'>
          <h1>{dummyData.name}</h1>

          <div className='food-items'>
            <h2>Potluck Info:</h2>
            <p><span>Location:</span> {dummyData.location}</p>
            <p><span>Date:</span> {dummyData.date}</p>
            <p><span>Time:</span> {dummyData.time}</p>

            <h2>Claimed Food:</h2>
            <ul>
              {dummyData.claimedFood.map(item => {
                return <li>{item}</li>
              })}
            </ul>

          </div>
        </section>
      </main>
    </>
  )
}

export default PotluckCard