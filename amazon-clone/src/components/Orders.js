import { useEffect, useState } from 'react'
import { db } from "./firebase"
import classes from './Orders.module.css'

import { useStateValue } from './StateProvider';
import Order from './Order'
const Orders = () => {

    const [{ basket, user }, dispatch] = useStateValue();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // if (user) {
            console.log("Hello")
            console.log(user)
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    // if we push or remove value from database it will provide a real time feedback/response 
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        // } else {
        //     setOrders([]);
        // }
    }, [user])


    return (
        <div className={classes.orders}>
            <h1>Your Orders</h1>
            {console.log(orders)}
            <div className={classes.orders__order}>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders