import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Appointments from './Appointments';
import Calendar from './Calendar';
import Home from './Home';
import Layout from './Layout';
import Login from './Login';

export default function App() {

  let storeToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  }

  let loadToken = () => {
    let token = localStorage.getItem("token");
    return token;
  }

  let logout = () => {
    localStorage.removeItem("token")
    setToken(null);
  }
 

  const [token, setToken] = useState(loadToken());


  const teachers = [
    {
      "name": "Nagy Sándor",
      "email": "nagy.sandor@sze.hu",
      "phone": "+36 (96) 613-618"
    },
    {
      "name": "Dr. Kovács Katalin",
      "email": "kovacsk@sze.hu",
      "phone": "+36 (96) 613-557"
    },
    {
      "name": "Kajdocsi László",
      "email": "kajdocsi.laszlo@sze.hu",
      "phone": "+36 (96) 613-616"
    },
    {
      "name": "Kocsis Zoltán Tamás",
      "email": "kocsisz@sze.hu",
      "phone": "+36 (96) 613-652"
    },
    {
      "name": "Paál Dávid Péter",
      "email": "paaldavid@sze.hu",
      "phone": "+36 (96) 503-400/3254"
    },
    {
      "name": "dr. Galli Richárd",
      "email": "richard@sze.hu",
      "phone": "+36 (96) 503-400/3285"
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout loggedIn={!!token} logout={logout} />}>
          <Route index element={<Home teachers={teachers} />} />

          <Route path="appointments/:index" element={token ? <Appointments teachers={teachers} /> : <Navigate replace to="/login" />} />
          <Route path="calendar" element={token ? <Calendar /> : <Navigate replace to="/login" />} />

          <Route path="login" element={!token ? <Login setToken={storeToken} /> : <Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);