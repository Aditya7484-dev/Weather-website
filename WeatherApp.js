const container=document.querySelector('.container');
const search=document.querySelector('.search');
const weatherBox=document.querySelector('.weather-box');
const wreatherDetail=document.querySelector('.weather-detail');

search.addEventListener('click',()=>{
  getReport();
});

document.querySelector('#location-input').addEventListener('keypress',(event)=>{
  if(event.key==="Enter"){
    getReport();
  }
});

getReport();

function getReport(){
  const ApiKey="e68059172701d771f96ccbb74bbe65f9";
  const cityName=document.querySelector('#location-input').value;

  if(cityName===""){
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${ApiKey}`)
    .then(res=>res.json())
    .then(json=>{
      console.log(json);
      const image=document.querySelector('#weatherImg');
      const temperature=document.querySelector('.temp');
      const description=document.querySelector('.condition');
      const humidity=document.querySelector('.weather-detail .humidity span');
      const wind=document.querySelector('.weather-detail .wind-detail span');

      switch(json.weather[0].main){
        case 'Clear':
          image.src='/images/clear.png';
          break;

        case 'Cloud':
          image.src='/images/cloud.png';
          break;

        case 'Rain':
          image.src='/images/rain.png';
          break;

        case 'Mist':
          image.src='/images/mist.png';
          break;

        case 'Snow':
          image.src='/images/snow.png';
          break;
        
        default:
          image.src='images/404.png';
          temperature.innerHTML='404';
          description.innerHTML='404 NOT FOUND';
          wind.innerHTML='404 NOT FOUND';
          break;
      }
      temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML=json.weather[0].description;
      wind.innerHTML=`${parseInt(json.wind.speed)} Km/h`;
      humidity.innerHTML=`${json.main.humidity}%`
    })
}