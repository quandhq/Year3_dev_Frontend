import TemperatureChart from "../Temperature/TemperatureLineChart";
import useFetch1 from "./useFetch1";

const About = () => {
   let url = 'http://127.0.0.1:8000/api/get/2012/12/12/';
  //Mỗi lần fetch lại data mới thì cái sensros sẽ bị thay đổi state nên là sẽ re-render lại cái SensorsList chứa cái state này nhưng cái  
  const {humidity,temperature,time} = useFetch1(url);    //cái này là object destructor
  const clickHandler = () => {alert("Not that fun but kind of")};
   return(
      <div className="container">
         <h1>HI THERE!</h1>
         <h2><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Obcaecati amet quia illum iusto magni rerum, molestias,
             architecto soluta repellat laboriosam quo cum iste quasi 
             consequuntur quam natus debitis sint earum!</p>
         </h2>
         <h2><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Obcaecati amet quia illum iusto magni rerum, molestias,
             architecto soluta repellat laboriosam quo cum iste quasi 
             consequuntur quam natus debitis sint earum!</p>
         </h2><h2><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Obcaecati amet quia illum iusto magni rerum, molestias,
             architecto soluta repellat laboriosam quo cum iste quasi 
             consequuntur quam natus debitis sint earum!</p>
         </h2>
         <h2><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Obcaecati amet quia illum iusto magni rerum, molestias,
             architecto soluta repellat laboriosam quo cum iste quasi 
             consequuntur quam natus debitis sint earum!</p>
         </h2>
      </div>
   );
}

export default About;