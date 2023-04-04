import room1 from "../images/room1.svg";
import MonitoredArea from "../components/MonitoredArea";
const Landing = () =>
{
    return (
        <section className="">
            <h2 className="text-center">All Monitored Areas</h2>
            <div className="container-lg">
                <div className="row row-cols-auto d-flex justify-content-center align-items-center">
                    <div className="col"><MonitoredArea img={room1} title={"Farm 1"} temp={37} light={400} sound={40} aqi={35}/></div>
                    <div className="col"><MonitoredArea img={room1} title={"Farm 2"} temp={37} light={400} sound={40} aqi={35}/></div>
                </div>
            </div>  
        </section> 
    );
};

export default Landing;