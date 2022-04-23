import FullCalendar from "@fullcalendar/react";
import { useNavigate, useParams } from "react-router-dom"
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Appointments({ teachers }) {

    const index = useParams().index;
    const teacher = teachers[index];
    let navigate = useNavigate();

    // 2 random kezdő idópont, február első hetéből
    let startTimestamps = [1644246000, 1644336000, 1644420600, 1644516000, 1644573600];
    let appointmerStarts = [
        startTimestamps[Math.floor(Math.random() * startTimestamps.length)]
    ];
    startTimestamps = startTimestamps.filter(item => !appointmerStarts.includes(item))
    appointmerStarts.push(startTimestamps[Math.floor(Math.random() * startTimestamps.length)])


    let appointments = [];

    for (let i = 0; i < 14; i++) {
        appointmerStarts.forEach(startTime => {
            let date = new Date((startTime + i * 60 * 60 * 24 * 7) * 1000);
            let data = { title: date.getHours() + ':00 - ' + (date.getHours() + 1) + ':30', start: date, display: 'block' }

            if (date < new Date()) {
                data.backgroundColor = '#8c8c8c';
                data.borderColor = '#8c8c8c';
            }

            appointments.push(data)
        })
    }

   

    let eventClick = (info) => {
        if (info.el.style.backgroundColor !== "rgb(140, 140, 140)") {
            document.getElementById("appointmentTime").innerHTML = info.event.title;
            let modal = new window.bootstrap.Modal(document.getElementById('appointmentModal'));
            modal.show()
        }
    }

    let HandleReserve = () => {
        navigate("/calendar")
    }


    return (
        <>
            <div className="modal fade show" id="appointmentModal" tabIndex="-1" aria-labelledby="appointmentModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="appointmentModalLabel">{teacher.name} Konzultáció <span id="appointmentTime"></span></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Mégsem</button>
                            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={HandleReserve}>Foglalás</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card shadow border-0 w-100">
                <div className="card-body">
                    <h1 className="card-title">{teacher.name}</h1>
                    <p className="card-text">
                        Email: <a className="card-text" href={"mailto:" + teacher.email}>{teacher.email}</a>
                        <br />
                        Telefon: <a href={"tel:" + teacher.phone}>{teacher.phone}</a>
                    </p>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={false}
                        locale="hu"
                        eventTimeFormat={{ meridiem: false, displayEventTime: false }}
                        events={appointments}
                        headerToolbar={{ end: 'prev,today,next', center: 'title', start: '' }}
                        buttonText={{ today: 'Ma' }}
                        dayHeaderFormat={{ weekday: 'long' }}
                        height="500px"
                        eventClick={eventClick}
                    />
                </div>
            </div>
        </>
    )
}