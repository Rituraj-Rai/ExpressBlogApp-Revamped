const lis = document.querySelectorAll("li");
const city = document.querySelector("h2");
const img = document.querySelector("img");
const tmp = document.querySelector("span");
const p = document.querySelector("div p");
const ipspan = document.getElementById("ip");


const success = async (pos) => {
    console.log("Location accessesed");
    console.log(pos.coords.latitude+":"+pos.coords.longitude);
    await getInfo(pos);
}

const error = (err) => {
    alert("unable to get the location"+err);
}

navigator.geolocation.getCurrentPosition(success,error);

const getInfo = async(loc) => {
    try {
        const { coords: {latitude, longitude} } = loc; //destructuring
        const res = await axios.get(`/weather/${latitude}/${longitude}`) // calling the api from server
        const { data } = res; //geting only data from response        
        fill(data);
        console.log(data); 
    } catch (err) {
        console.log(err.message);
    }
}

function fill(data){
    city.innerText = data.name;
    tmp.innerText = `${data.main.temp}° C`;
    p.innerText = `${data.weather[0].description}`;
    lis[0].innerText = `Humidity ${data.main.humidity}%`
    lis[1].innerText = `Wind Speed: ${data.wind.speed} m/s`
    ipspan.innerText = data.ip;
    img.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
}
