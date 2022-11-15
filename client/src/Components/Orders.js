import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/orders',{
            method:'GET',
            headers:{
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            },
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
               navigate('/login') 
            }
            return res.json()
        })
        .then(data => {
            setOrders(data);
        })
    })
    return (
        <div>
            <h2>Orders...</h2>
            {
                orders.map(order => <p key={order.id}>{order.item}</p>)
            }
        </div>
    );
};

export default Orders;