import MainTest from "../GetChartTemperature/MainTest"
import TemperatureChart from "../Temperature/TemperatureChart";

const MainTemperature = () => 
{
  let url = `http://localhost:8000/api/v1/sensors/listCreate/${id}`;
  //Mỗi lần fetch lại data mới thì cái sensros sẽ bị thay đổi state nên là sẽ re-render lại cái SensorsList chứa cái state này nhưng cái 
  //SpidermanList sẽ ko re-render lại vì prop của nó vẫn thế 

  const {sensorsHumidity, sensorsTemperature} = useFetch(url);    //cái này là object destructor

   return (
      <div>
         <div className='container px-2 py-2'>
          <div className='row'>
            <div className='col-3'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><TemperatureChart data={sensorsTemperature}/></div> 
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div>
              {/* <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div> */}
            </div>

            <div className='col-9'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><p>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Nostrum repudiandae, qui voluptatum ut provident, 
                fugit voluptate totam at dolore harum, veniam natus obcaecati commodi
                 consequuntur sequi quasi! Odio, nostrum nisi.</p></div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div>
              {/* <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div> */}
              
            </div>

          </div>
        </div>
      </div>
   );
};

export default MainTemperature;
