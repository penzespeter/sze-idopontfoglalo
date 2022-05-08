import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function TeacherAppointments({appointments}) {  

    const [selected, setSelected] = useState(appointments[0]);
    const [appointmentsList, setAppointmentsList] = useState(appointments);

    let show = (appointment) => {
        setSelected(appointment);
        let modal = new window.bootstrap.Modal(document.getElementById('showAppointmentModal'));
        modal.show()
    }

    let deleteAppointment = (index) => {
        let array = [...appointmentsList];
        array.splice(index, 1);
        setAppointmentsList(array);
    }

    let generateNames = (count) => {
        let lastNames = ["Nagy","Kovács","Tóth","Oláh","Lakatos","Varga","Orosz","Pintér","Liszkay","Ordasy"];
        let firstNames = ["Levente","Hanna","Máté","Zoé","Dominik","Anna","Bence","Léna","Olivér","Luca","Noel","Emma","Marcell","Boglárka","Dániel","Lili","Zalán","Lilien","Ádám","Lara","Milán","Zsófia","Botond","Laura","Benett","Mira","Dávid","Sára","Zsombor","Olívia","Áron","Nóra","Balázs","Lilla","Benedek","Maja"];


        let names = [];
        for (let i = 0; i < count; i++) {
            names.push(lastNames[Math.floor(Math.random() * lastNames.length)] + ' ' + firstNames[Math.floor(Math.random() * firstNames.length)]);
        }

        return names
    }

    let showNewAppointmentModal = () => {
        let modal = new window.bootstrap.Modal(document.getElementById('newAppointmentModal'));
        modal.show()
    }

    return (
        <>
            <div className="modal fade show" id="newAppointmentModal" tabIndex="-1" aria-labelledby="newAppointmentModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newAppointmentModalLabel">Új Időpont Felvétele</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" id="appointmentBody">
                            <form className="mt-3">
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Dátum</label>
                                    <input type="date" className="form-control" id="date"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="start" className="form-label">Kezdés időpontja</label>
                                    <input type="time" className="form-control" id="start" placeholder="Kezdés" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="end" className="form-label">Befejezés időpontja</label>
                                    <input type="time" className="form-control" id="end" placeholder="Befejezés" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="places" className="form-label">Helyek száma</label>
                                    <input type="number" min={1} className="form-control" id="places" placeholder="Helyek száma" />
                                </div>
                                <div className="mb-3">
                                    <input class="form-check-input" type="checkbox" id="repeated" />
                                    <label class="form-check-label ms-2" for="repeated">
                                        Ismétlődés hetente
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Mégse</button>
                            <button type="button" className={"btn btn-primary"} data-bs-dismiss="modal">Felvétel</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade show" id="showAppointmentModal" tabIndex="-1" aria-labelledby="appointmentModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="appointmentModalLabel">{selected.start.toLocaleDateString("hu-HU")} {selected.title} <span id="appointmentTime"></span></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Hallgatók ({selected.reserved}):</p>
                            <ol>
                                {
                                    generateNames(selected.reserved).map(name => {
                                        return <li>{name}</li>
                                    })
                                }
                            </ol>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Bezárás</button>
                            <button type="button" className={"btn btn-primary " + (selected.old ? "disabled" : "")} data-bs-dismiss="modal">Bővítés</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow border-0 w-100 mb-5">
                <div className="card-body">
                    <div className="d-flex justify-content-end">
                        <button className={"btn btn-success btn-icon-only text-white"} onClick={showNewAppointmentModal}>
                            <i className="fas fa-add"></i> Új időpont felvétele
                        </button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Dátum</th>
                                <th>Időpont</th>
                                <th>Helyek</th>
                                <th>Műveletek</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointmentsList.map((appointment, index) => { 
                                    return (
                                        <tr className={appointment.old ? "text-decoration-line-through bg-light" : ""} key={index}>
                                            <td>{appointment.start.toLocaleDateString("hu-HU")}</td>
                                            <td>{ appointment.title }</td>
                                            <td>{ appointment.reserved }/{ appointment.places } {appointment.full ? "Betelt" : ""}</td>
                                            <td>
                                                <button className={"btn btn-info btn-icon-only text-white"} onClick={() => show(appointment)}>
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button className={"btn btn-danger btn-icon-only text-white ms-2 " + (appointment.old ? "disabled" : "")} onClick={() => deleteAppointment(index)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}