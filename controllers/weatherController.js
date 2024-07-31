const axios = require('axios');

const getWeatherPage = (req, res) => {
    res.render('weather');
}

// Listening Weather API requests-->

const weather = async (api) => {
    try {
        return axios.get(api); // returns promise
    } catch (err) {
        console.log(err.message);
    }
}

const getWeatherData = async (req,res) => {
    try {
        const {lat, lon} = req.params;
        let api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`;
        const { data } = await weather(api_url); //extracting only data component
        data.ip = req.ip; //adding ip value to the data object
        res.send(data);
        console.log("Weather fetched by ip: "+req.ip);
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = {
    getWeatherPage,
    getWeatherData
};