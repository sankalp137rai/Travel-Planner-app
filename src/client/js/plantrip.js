let plantrip = async (event) => {
  event.preventDefault();
  console.log("fetch started")
  try {
    //preventing form submit
    let cityname = document.querySelector('#cityname-input').value;
    let tripData = await getDataFromServers(cityname);
    console.log("fetch from external API succeeded")
    let postData = await postDataTo("http://localhost:8000/postdata",tripData);
    console.log("post to server succeeded")
    let getData = await fetch("http://localhost:8000/getdata");
    console.log("get request from server succeeded")
    let {pixabayImageURL , weatherData} = await getData.json();
    
    console.log("updating UI")
    updateUI(pixabayImageURL,weatherData,cityname);
    console.log("UI update finished successfully")

  } catch (e) {
    throw e
  }
}

// Function to Post data to server
let postDataTo = async (url, data)=>{
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let resdata = await res.json();
    return resdata
  } catch (e) {
    throw e
  }
}

// getting data from external api
let getDataFromServers = async (cityname) => {
  try {
    //Setting api keys
    const GEONAMES_USERNAME = "sankalpRai"
    const PIXABAY_API_KEY = "17236816-6ef86d2da2ee2aca522ce905e"
    const WEATHERBIT_API_KEY = "b0c0374591d1480c9e11009ae90496a2"

    //fetching latitude and longitude of city
    let geofetch = await fetch(`http://api.geonames.org/searchJSON?name=${cityname}&featureClass=P&fetureCode=PPLS&username=${GEONAMES_USERNAME}`)
    let geonamesData = await geofetch.json()
    let { lat, lng, countryName } = await geonamesData.geonames[0];

    //checking if date is after a week or not
    let traveldate = document.querySelector('#travel-date').valueAsDate
    let weatherData = []
    if(isAfterWeek(traveldate)){
      //fetching weather forecast 
      let weatherfetch = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`)
      weatherData = await weatherfetch.json()
  
      // giving response of only necessary weather info
      let tempData = []
      for (let data of weatherData['data']) {
        tempData.push({ 'date': data['valid_date'], 'wind_direction': data['wind_cdir_full'], 'high_temp': data['high_temp'], 'weather_description': data['weather']['description'], 'weather_icon': data['weather']['icon'] })
      }
      weatherData = tempData
    }else{
      let weatherfetch = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`)
      weatherData = await weatherfetch.json()
      let data = weatherData['data'][0]
      weatherData = [{ 'date': data['ob_time'], 'wind_direction': data['wind_cdir_full'], 'high_temp': data['temp'], 'weather_description': data['weather']['description'], 'weather_icon': data['weather']['icon'] }]
    }

    //fetching image from pixabay
    let pixabayfetch = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURI(cityname)}&image_type=photo&pretty=true`)
    let pixabayData = await pixabayfetch.json()
    let { total: totalimg } = await pixabayData
    //if there are no images for city then select country
    if (totalimg <= 0) {
      pixabayfetch = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURI(countryName)}&image_type=photo&pretty=true`)
      pixabayData = await pixabayfetch.json()
    }
    //fetching the first image from pixabay data
    let { hits } = await pixabayData
    let { largeImageURL: pixabayImageURL } = hits[0]
    console.log(pixabayImageURL, weatherData)
    return { pixabayImageURL, weatherData }
  } catch (e) {
    throw e
  }
}


let updateUI = async (imageUrl,weatherData,cityname)=>{

  let cityimage = document.querySelector('#cityimage')
  cityimage.src = imageUrl
  cityimage.alt = cityname
  let index = 0
  let traveldate = document.querySelector('#travel-date').value
  for(let i =0 ; i<weatherData.length ; ++i){
    if(traveldate == weatherData[i]['date']){
      index = i
    }
  }


  let city = document.querySelector('#cityname').innerHTML = cityname
  let tripDate = document.querySelector('#trip-date').innerHTML = weatherData[index]['date']
  let wind = document.querySelector('#wind-direction').innerHTML = weatherData[index]['wind_direction']
  let high_temp = document.querySelector('#Highest-Temperature').innerHTML = weatherData[index]['high_temp']
  let weather_description = document.querySelector('#Weather-Description').innerHTML = "Weather of the day might be " + weatherData[index]['weather_description']

  let tripplan = document.querySelector('#trip-plan');
  tripplan.classList.remove('disabled');
  
}

let isAfterWeek = (date) => {
  return Math.floor((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7)) > 0
};

export { plantrip , getDataFromServers };
