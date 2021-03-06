import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// const demoList = [{ itemname: 'Macaroni' },{ itemname: 'Burgers'},{ itemname: 'Potato Salad'}];

const FoodList =  props => {

    const [foodItems, setFoodItems] = useState([]);
    const { potluckid, potluckData } = props;
    const [addItem, setAddItem] = useState({itemname:''});
    const [error, setError] = useState('');
    const [userID, setUserID] = useState('');

    const handleChange = e => {
        setAddItem({itemname: e.target.value});
    };

    //checked by leah - good
    const getFoodList = id => {
        axiosWithAuth()
        .get(`/api/users/${userID}/potlucks/${id}/items`)
        .then(res => {
            console.log('food list response', res.data);
            setFoodItems(res.data);
        })
        .catch(err => console.log(err));
    };
    
    //checked by leah - good
    const addFood = e => {
        e.preventDefault();
        axiosWithAuth()
            .post(`/api/users/${userID}/potlucks/${potluckid}/items`, addItem)
            .then(res => {
                console.log(res);
                getFoodList(potluckid);
                setAddItem({itemname:''});
            })
            .catch(err => {
                console.log(err.response.data);
                setError(err.response.data.message);
            });
    };

    // checked by leah - good
    const removeFood = e => {
        e.preventDefault();
        axiosWithAuth()
            .delete(`api/users/${userID}/potlucks/${potluckid}/items/${e.target.id}`)
            .then(res => {getFoodList(potluckid)})
            .catch(err => console.log(err.response.data));
    };

    //checked by leah - good
    const claimFood = e => {
        axiosWithAuth()
          .patch(`api/potlucks/${potluckid}/items/${e.target.id}`)
          .then(res => {getFoodList(potluckid)})
          .catch(err => console.log(err.response.data));
    };

    //checked by leah - good
    useEffect(() => {
        setUserID(parseInt(localStorage.getItem('userID'), 10));
        console.log('potluckdata', potluckData);
        getFoodList(potluckid);
        axiosWithAuth()
          .get(`/api/auth/users`)
          .then(res => {
              console.log(res.data);
        })
          .catch(err => console.log(err.response.data.message));
    },[potluckid, potluckData]);


    return (
        <div>
            <div className='food-table'>
                <div className='table-column'>
                    <p>Food Item</p>
                    {foodItems.map(item => <div className='table-cell'>{item.itemname}</div>)}
                </div>
                <div className='table-column'>
                    <p>Brought By</p>
                    {foodItems.map(item => 
                        <div className='table-cell'>
                            {item.user ? item.user.username : 'available'}
                        </div>)}
                </div>
                <div className='table-column'>
                    <p>Claim Item</p>
                    {foodItems.map(item => 
                        <div className='table-cell'>
                            {item.user
                                ? 'Claimed!'
                                : <button id={item.itemid} onClick={claimFood}>Reserve</button>}
                        </div>)
                    }
                </div>
                { userID === potluckData.user.userid
                    ? <div className='table-column'>
                        <p>Remove?</p>
                        {foodItems.map(item => 
                        <div className='table-cell'>
                            <button onClick={removeFood} id={item.itemid}>
                                Remove
                            </button>
                        </div>)}
                    </div>
                    : ''
                }
            </div>
            { userID === potluckData.user.userid
            ? <div>
                <button onClick={addFood}>
                    Add Food Item
                </button>
            <input type='text' name='foodItem' onChange={handleChange} value={addItem.itemname}/>
            <p>{error}</p>
            </div> 
            : 
            ''
            }
        </div>
    )
};

export default FoodList;
