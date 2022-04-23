import avatar from "./avatar.png";

export default function Home({teachers}) {

  return (
    <div className="row">
      {
        teachers.map((teacher, index) => {
          return (
            <div className="col-sm-12 col-md-4 col-lg-3 py-3" key={index}>
              <div className="card shadow border-0">
                <a href={"/appointments/" + index}>
                  <img src={avatar} className="card-img-top" alt="kep" />
                </a>
                <div className="card-body">
                  <h5 className="card-title">{teacher.name}</h5>

                  <p className="card-text">
                    Email: <a className="card-text" href={"mailto:" + teacher.email}>{teacher.email}</a>
                    <br />
                    Telefon: <a href={"tel:" + teacher.phone}>{teacher.phone}</a>
                  </p>

                  <a href={"/appointments/" + index} className="btn btn-primary">Időpontok</a>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};
