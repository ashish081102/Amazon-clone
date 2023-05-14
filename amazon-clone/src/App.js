import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Checkout from './components/Checkout';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Orders from './components/Orders';
import { useStateValue } from './components/StateProvider';
import { auth } from './components/firebase'
import Payment from './components/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe('pk_test_51MsMs2SGQXBIbWm2zPiUiXCE8a6lylTWRps8DzWyxmDIG2yiQKlougjHGL0ugbi2MHjHM9tRvixbkk0HBo2E0Rly00EyexHcYX')

function App() {
  const [{ }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("user is >>>>", authUser);
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/orders' element={[
            <Header />,
            <Orders />
          ]
          } />
          <Route path='/login' element={
            <Login />
          } />
          <Route path='/payment' element={
            [<Header />,
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            ]} />
          <Route path='/checkout' element={
            [<Header />,
            <Checkout />]
          } />
          <Route path='/' element={
            [<Header />,
            <Home />]
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;