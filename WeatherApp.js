const container=document.querySelector('.container');
const search=document.querySelector('.search');
const weatherBox=document.querySelector('.weather-box');
const wreatherDetail=document.querySelector('.weather-detail');
const error404=document.querySelector('.notFound');

search.addEventListener('click',()=>{
  getReport();
});

document.querySelector('#location-input').addEventListener('keydown',(event)=>{
  if(event.key==="Enter"){
    getReport();
  }
});

function getReport(){
  const ApiKey="e68059172701d771f96ccbb74bbe65f9";
  const cityName=document.querySelector('#location-input').value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${ApiKey}`)
    .then(res=>res.json())
    .then(json=>{
      console.log(json);
      if(json.cod == 404){

        container.style.height='400px';
        error404.classList.add('active');
        weatherBox.classList.remove('active');
        wreatherDetail.classList.remove('active');
        return;

      }else {

        container.style.height='500px';
        weatherBox.classList.add('active');
        wreatherDetail.classList.add('active');
        error404.classList.remove('active');
  
        const image=document.querySelector('#weatherImg');
        const temperature=document.querySelector('.temp');
        const description=document.querySelector('.condition');
        const humidity=document.querySelector('.weather-detail .humidity span');
        const wind=document.querySelector('.weather-detail .wind-detail span');
  
        switch(json.weather[0].main){
          case 'Clear':
            image.src='/images/clear.png';
            break;
  
          case 'Clouds':
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
            break;
        }
        temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML=json.weather[0].description;
        wind.innerHTML=`${parseInt(json.wind.speed)} Km/h`;
        humidity.innerHTML=`${json.main.humidity}%`        
      }
    })
}