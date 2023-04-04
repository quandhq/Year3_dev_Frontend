import { Link } from "react-router-dom";

// Bug: How to change card-img size if replacing img file

const MonitoredArea = ({ img, title , temp, light, sound, aqi}) => {
    return (
        <div className="card">
            <img clasName="card-img-top" src={img} alt=""/>
            <div className="card-body">
                <div className="container d-flex flex-column align-items-center justify-content-center">
                    <h5 className="card-title">{title}</h5>
                    <div className="row">
                        <div className="col-lg fw-normal text-start">
                            <h6>Temperature</h6>
                            <h6>Light</h6>
                            <h6>Sound</h6>
                            <h6>AQI</h6>
                        </div>

                        <div className="col-lg fw-normal text-start">
                            <h6>{temp} &deg;C</h6>
                            <h6>{light} lux</h6>
                            <h6>{sound} db</h6>
                            <h6>{aqi}</h6>
                        </div>
                    </div>
                    <Link to={'/building1'} className="btn btn-md btn-primary">Show more</Link>
                </div> 
            </div>
        </div>
    );
};

export default MonitoredArea;