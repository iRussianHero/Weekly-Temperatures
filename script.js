let apiKey = "2a5e17dce8914cc1122f1e89e7fd69af";
let apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

async function getWeatherByCityName(){
    let cityName = $('#city').val();
    let response = await fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`);
    let data = await response.json();
    //let dataCount = data.list;
    let weekDate = [];

    console.log(data);

    for (let i = 1; i < 7; i++) { 
        let followingDay = new Date(Date.now() + (86400000 *i));
        weekDate.push(followingDay.toISOString().slice(0,10));
    }

    //console.log(weekDate);

    let itemsArr = [];
    let count = 1;

    
    for (const item of data.list) {
        if (weekDate.includes(item.dt_txt.slice(0, 10))) {
            count++;
            itemsArr.push(item);
            weekDate = weekDate.filter(data=>data!=item.dt_txt.slice(0,10));
        }
    }

    for (const item of itemsArr){
        $('.cards').append(($('<div>',{'class': 'card'})).append($(`<img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" class="card-img-top" alt="...">`))
        .append($('<div>',{'class': 'card-body'}).append($(`<h5 class="card-title">${data.city.name}  :  ${Math.round(item.main.temp)} ℃</h5>`))
        .append($(`<p class="card-text">Min temperature : ${Math.round(item.main.temp_min)} ℃</p>`))
        .append($(`<p class="card-text">Max temperature : ${Math.round(item.main.temp_max)} ℃</p> `))
        .append($(`<p class="card-text">Pressure : ${Math.round(item.main.pressure)}</p> `))
        .append($(`<p class="card-text">Humidity : ${Math.round(item.main.humidity)}</p>`))));
    }
}

addEventListener('submit',function (){
    event.preventDefault();
    getWeatherByCityName();
})