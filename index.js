// ==== ID & Class get kr rhe hai html se  ======

const inputBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const wheatherImg = document.getElementById('wheather') ;
const tem = document.querySelector('.temperature');
const des = document.querySelector('.description');
const hum = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');
const notFound = document.querySelector('.not-found');
const info = document.querySelector('.wheather-info');
const Clear = document.querySelector('.btn-clear');
// const hid = document.querySelector('.hidden');
// const show = document.querySelector('.show');


// function se api calll
async function checkWheather(city){
    const apiMy = "f8ce8450c27c17c6293ba18a6d0eeabf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiMy}`

    const wheatherData = await fetch(`${url}`).then((response) => response.json());


//==== not found img===

    if(wheatherData.cod === '404'){
        notFound.style.display = "flex";
        info.style.display = "none"
        console.log("error");
        return;
    }
    notFound.style.display = "none";
    info.style.display = "flex"

    // console.log(wheatherData)

    // api mai se call kr rhe hai 

    tem.innerHTML = `${Math.round(wheatherData.main.temp - 273.15)}°C`

    des.innerHTML = `${wheatherData.weather[0].description}`

    hum.innerHTML = `${wheatherData.main.humidity}%`

    wind.innerHTML = `${wheatherData.wind.speed}Km/h`

    // img change ho rhi wheather condition ke hisab se

    switch (wheatherData.weather[0].main){
        case 'Clouds' :
            wheatherImg.src = "./img-wheather/cloud.png";
            break;
        case 'Clear' :
            wheatherImg.src = "./img-wheather/sun.png";
            break;
        case 'Rain' :
            wheatherImg.src = "./img-wheather/rain.png";
            break;        
        case 'Mist' :
            wheatherImg.src = "./img-wheather/minset.png";
            break; 
        case 'Snow' :
            wheatherImg.src = "./img-wheather/snow.png";
            break;
    }

    // temp ke according color change

    const degree = Math.round(wheatherData.main.temp - 273.15)
    console.log(degree , degree);

    if(degree <= 10){
        des.classList = "red"
    }else if(degree > 10 && degree < 30){
        des.classList = "green"
    }else{
        des.classList = "yellow"
    }
   

}

//  btn work

searchBtn.addEventListener('click' , () => {
    checkWheather(inputBox.value);
})

Clear.addEventListener('click', () => {
    inputBox.value= ''
})
