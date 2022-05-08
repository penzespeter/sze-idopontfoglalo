import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Appointments from './Appointments';
import Calendar from './Calendar';
import Home from './Home';
import Layout from './Layout';
import Login from './Login';
import "./App.css";
import Register from './Register';
import TeacherAppointments from './TeacherAppointments';

export default function App() {

  let storeToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  }

  let loadToken = () => {
    let token = localStorage.getItem("token");
    
    if (token) {
      token = JSON.parse(token);
    }

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

  teachers.forEach(teacher => {
     // 2 random kezdő idópont, február első hetéből
     let startTimestamps = [1644246000, 1644336000, 1644420600, 1644516000, 1644573600];
     let appointmerStarts = [
         startTimestamps[Math.floor(Math.random() * startTimestamps.length)]
     ];
     startTimestamps = startTimestamps.filter(item => !appointmerStarts.includes(item))
     appointmerStarts.push(startTimestamps[Math.floor(Math.random() * startTimestamps.length)])
 
 
     let appointments = [];
 
     for (let i = 0; i < 18; i++) {
         appointmerStarts.forEach(startTime => {
             let date = new Date((startTime + i * 60 * 60 * 24 * 7) * 1000);
             let num = Math.floor(Math.random() * 15) + 10;
 
             let data = { title: date.getHours() + ':00 - ' + (date.getHours() + 1) + ':30', start: date, full: false, old: false, places: num, reserved: Math.floor(Math.random() * num)}
 
             if (date < new Date()) {
                 data.old = true;
             }
             if (Math.floor(Math.random() * 10) < 4) {
                 data.full = true;
                 data.reserved = data.places;
             }
             
             appointments.push(data)
         })
     }
     teacher.appointments = appointments;
  });

  console.log(teachers);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout token={token} logout={logout} />}>
          <Route index element={<Home teachers={teachers} />} />

          <Route path="appointments/:index" element={token ? <Appointments teachers={teachers} /> : <Navigate replace to="/login" />} />
          <Route path="calendar" element={token ? (token.teacher ? <TeacherAppointments appointments={teachers[0].appointments} />: <Calendar teachers={teachers} />) : <Navigate replace to="/login" />} />

          <Route path="login" element={!token ? <Login setToken={storeToken} /> : <Navigate replace to="/" />} />
          <Route path="register" element={!token ? <Register setToken={storeToken} /> : <Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);