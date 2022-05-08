import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar({teachers}) {
    // 2 random kezdő idópont, február első hetéből
    let startTimestamps = [1644246000, 1644336000, 1644420600, 1644516000, 1644573600];
    let appointments = [];

    for (let i = 0; i < 5; i++) {
        let teacher = teachers[Math.floor(Math.random() * teachers.length)];
        let date = new Date(( startTimestamps[Math.floor(Math.random() * startTimestamps.length)] + (12 + Math.floor(Math.random() * 6)) * 60 * 60 * 24 * 7) * 1000);
        let data = { title: date.getHours() + ':00 - ' + (date.getHours() + 1) + ':30 / ' + teacher.name, start: date, display: 'block' }

        if (date < new Date()) {
            data.backgroundColor = '#8c8c8c';
            data.borderColor = '#8c8c8c';
        }

        appointments.push(data)
    }

    return (
        <>
            <div className="card shadow border-0 w-100">
                <div className="card-body">
                    <h1 className="card-title">Konzultációs időpontjaim</h1>
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
                    />
                </div>
            </div>
        </>
    )
}