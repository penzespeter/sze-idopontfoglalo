import { useState } from "react";

export default function Login({setToken}) {

    const [email, setEmail] = useState("");

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleLogin = () => {
        setToken({token:"asd", teacher: email === "oktato@sze.hu"});
    }


    return (
        <div className="row w-100 justify-content-center">
            <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6">
                <div className="card shadow border-0">
                    <div className="card-body">
                        <h5 className="card-title">Belépés</h5>
                        <form className="mt-3" onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email cím</label>
                                <input type="email" className="form-control" id="email" placeholder="pelda@email.com" value={email} onChange={emailChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Jelszó</label>
                                <input type="password" className="form-control" id="password" placeholder="Jelszó" />
                            </div>
                            <div className="mb-3 d-felx">
                                <button className="btn btn-primary" type="submit">
                                    Bejelentkezés
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        Még nincs fiókod? <a href="/register">Regisztráció</a>
                    </div>
                </div>
            </div>
        </div>
    );
};