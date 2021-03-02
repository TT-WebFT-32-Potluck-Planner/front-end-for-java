import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Potluck = () => {
    const { potluckid } = useParams();

    return (
        <div>
            <h2>Potluck Page Goes Here</h2>
        </div>
    )
}

export default Potluck
