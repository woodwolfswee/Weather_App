import React,{useState} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";

function App() {
  const[data,setData]=useState({});
  const[location,setLocation]=useState('');

  const apiKey = process.env.REACT_APP_API_KEY;

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchlocation=(event)=>{
    if(event.key ==='Enter'){
      axios.get(url).then((response)=>{
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
    }
  }

  const dateBuilder=(d)=>{
    const months= ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    const day=days[d.getDay()];
    const date=d.getDate();
    const month=months[d.getMonth()];
    const year=d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`
  }
  const icon= `http://openweathermap.org/img/wn/${data.weather ? data.weather[0].icon : null}.png`;

  return (
    <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>World's weather</title>
    <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>

    <article className='wrapper'>
    <div className="app">
      <div className="search">
        <input type="text" value={location} onChange={event=>setLocation(event.target.value)} onKeyPress={searchlocation} placeholder="Enter a city..."/>
      </div>
        <div className="container">
        {data.name===undefined &&
             <div>
                 <center><h2>Welcome to World's weather!</h2></center>
                  <center><p>Created by Shreyan Dhar and Deepesh Kumar Singh</p></center>
                  <br/><br/><br/>
                  <center><h1>Enter a city to check it's weather.</h1></center>
             </div>
             }

        {data.name !== undefined &&

          <div className="top">
            <div className="location">
              <p>{data.name},</p>
              {data.sys ? <p>{data.sys.country}</p> : null}
            </div>
            <div className="temp">
              {data.main ? <h1 className="Tempa">{data.main.temp.toFixed()}℃</h1> : null}
            </div>
            <div className="description">
              <div className="child">
                <img className='chobi' src={icon} alt="" />
              </div>
               <div className="child">
               {data.weather ? <h1>{data.weather[0].main} </h1> : null}
               </div>
               <div className="child">
                {data.main ? <h1>({data.main.temp_min.toFixed()}℃ ~ {data.main.temp_max.toFixed()}℃)</h1> : null}
               </div>
            </div>
            <div className="time">
            <p>{dateBuilder(new Date())}</p>
            </div>
          </div>
        } 

          {data.name !== undefined &&
                  <div className="bottom">
                    <div className="feels">
                      {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}℃</p> : null}
                      <p>Feels like</p>
                    </div>
                    <div className="humidity">
                      {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                      <p>Humidity</p>
                    </div>
                    <div className="wind">
                      {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
                      <p>Wind speed</p>
                    </div>
                    <div className="Pressure">
                      {data.wind ? <p className='bold'>{data.main.pressure} mmHg</p> : null}
                      <p>Pressure</p>
                    </div>
                  </div>
          }

        </div>
    </div>
    </article>
    </>
  );
}

export default App;
