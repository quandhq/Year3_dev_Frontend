// TODO: Create a circle box (using div) or using other class?


const AirQualityIndex = ({ aqi }) => {
    var bgColour="";
    var level="";

    if (aqi > 0  && aqi <=50){
        bgColour = "#008000";   
        level = "Good";
    } else if (aqi > 50  && aqi <= 100) {
        bgColour = "#FFFF00";
        level = "Moderate";
    } else if (aqi > 100  && aqi <= 150) {
        bgColour = "#FF8C00";
        level = "Unhealthy for Sensitive Groups";
    } else if (aqi > 150  && aqi <= 200) {
        bgColour = "#FF0000";
        level = "Unhealthy";
    } else if (aqi > 200  && aqi <= 300) {
        bgColour = "#6A5ACD";
        level = "Very Unhealthy";
    } else if (aqi > 300 ) {
        bgColour = "#A0522D";
        level = "Hazardous";
    } 

    
// this component is used to display the AQI and click on it for more detailed information about the levels of this indicator.
    return (
        <div className="text-center">
            <button onClick={() => {
                window.open( "https://www.airnow.gov/aqi/aqi-basics/", "_blank")
            }} style={{
                width: 140,
                height: 140,
                borderRadius: "100%",
                fontSize: 50,
                background: bgColour,
                }}> {aqi}
                </button>
            <h3 className="text-center" >{level}</h3>
        </div>

    );
};

export default AirQualityIndex;