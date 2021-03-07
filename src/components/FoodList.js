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
            setFoodItems(res.data);
        })
        .catch(err => console.log(err));
    };
    
    const addFood = e => {
        e.preventDefault();
        axiosWithAuth()
            .post(`/api/users/${userID}/potlucks/${potluckid}/items`, addItem)
            .then(res => {
                getFoodList(potluckid);
                setAddItem({itemname:''});
            })
            .catch(err => {
                console.log(err.response.data);
                setError(err.response.data.message);
            });
    };

    const removeFood = e => {
        e.preventDefault();
        axiosWithAuth()
            .delete(`api/users/${userID}/potlucks/${potluckid}/items/${e.target.id}`)
            .then(res => {getFoodList(potluckid)})
            .catch(err => console.log(err.response.data));
    };

    const claimFood = e => {
        axiosWithAuth()
          .patch(`api/potlucks/${potluckid}/items/${e.target.id}`)
          .then(res => {getFoodList(potluckid)})
          .catch(err => console.log(err.response.data));
    };

    useEffect(() => {
        setUserID(parseInt(localStorage.getItem('userID'), 10));
        getFoodList(potluckid);
    },[potluckid, potluckData]);


    return (
        <div>
            <div className='food-table'>
                <div className='table-column'>
                    <p>Food Item</p>
                    {foodItems.map(item => <div className='table-cell' key={item.itemid}>{item.itemname}</div>)}
                </div>
                <div className='table-column'>
                    <p>Brought By</p>
                    {foodItems.map(item => 
                        <div className='table-cell' key={item.itemid}>
                            {item.user ? item.user.username : 'available'}
                        </div>)}
                </div>
                <div className='table-column'>
                    <p>Claim Item</p>
                    {foodItems.map(item => 
                        <div className='table-cell' key={item.itemid}>
                            {item.user
                                ? 'Claimed!'
                                : <button className="little-button" id={item.itemid} onClick={claimFood}>Reserve</button>}
                        </div>)
                    }
                </div>
                { userID === potluckData.user.userid
                    ? <div className='table-column'>
                        <p>Remove?</p>
                        {foodItems.map(item => 
                        <div className='table-cell'>
                            <button  className="little-button" onClick={removeFood} id={item.itemid}>
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
