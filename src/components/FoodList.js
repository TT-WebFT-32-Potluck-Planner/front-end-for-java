import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const demoList = [{ itemname: 'Macaroni' },{ itemname: 'Burgers'},{ itemname: 'Potato Salad'}];
const FoodList =  props => {

    const [foodItems, setFoodItems] = useState(demoList);
    const { potluckid, potluckData } = props;
    const isOrganizer = localStorage.getItem('userID') === potluckData.organizerid.toString();
    const [addItem, setAddItem] = useState({itemname:''});
    const [error, setError] = useState('');

    const handleChange = e => {
        setAddItem({itemname: e.target.value});
    };

    const getFoodList = id => {
        axiosWithAuth()
        .get(`/api/potlucks/${id}/items`)
        .then(res => {
            console.log(res.data);
            setFoodItems(res.data);
        })
        .catch(err => console.log(err));
    };
    
    const addFood = e => {
        e.preventDefault();
        axiosWithAuth()
            .post(`/api/potlucks/${potluckid}/items`, addItem)
            .then(res => {
                console.log(res);
                getFoodList(potluckid);
            })
            .catch(err => {
                console.log(err.response.data);
                setError(err.response.data.message);
            });
    };

    const removeFood = e => {
        e.preventDefault();
        axiosWithAuth()
            .delete(`api/potlucks/${potluckid}/items/${e.target.id}`)
            .then(res => {getFoodList(potluckid)})
            .catch(err => console.log(err.response.data));
    };

    const claimFood = e => {
        axiosWithAuth()
          .put(`api/potlucks/${potluckid}/items/${e.target.id}`, {'userid': localStorage.getItem('userID')})
          .then(res => {getFoodList(potluckid)})
          .catch(err => console.log(err.response.data));
    };

    useEffect(() => {
        getFoodList(potluckid);
    },[]);

    return (
        <div>
            <div className='food-table'>
                <div className='table-column'>
                    <p>Food Item</p>
                    {foodItems.map(item => <div className='table-cell'>{item.itemname}</div>)}
                </div>
                <div className='table-column'>
                    <p>Brought By</p>
                    {foodItems.map(item => <div className='table-cell'>{item.userid || 'available'}</div>)}
                </div>
                <div className='table-column'>
                    <p>Claim Item</p>
                    {foodItems.map(item => <div className='table-cell'>{item.userid ? <br/> : <a id={item.itemid} onClick={claimFood}>Reserve</a>}</div>)}
                </div>
                {isOrganizer ? 
                <div className='table-column'>
                    <p>Remove?</p>
                    {foodItems.map(item => <div className='table-cell'><a onClick={removeFood} id={item.itemid}>Remove</a></div>)}
                </div>
                 : ''}
            </div>
            { isOrganizer? 
            <div>
            <button onClick={addFood}>Add Food Item</button>
            <input type='text' name='foodItem' onChange={handleChange} value={addItem.itemname}/>
            <p>{error}</p>
            </div> : ''
            }
        </div>
    )
};

export default FoodList;
