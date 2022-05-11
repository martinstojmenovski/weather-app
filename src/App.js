import {useState} from 'react'
import './App.css';
//api key to Open Weather unique key
const apiKey = "7391ffc2e51ea366dd00f925a0faeafd"

//add component
function App() {

  //state fir nivue data frin api
const [cityName, setSearchTerm] = useState("")
const[displayTemerature, setDisplayTemperature] = useState(null)
const [message, setMessage] = useState("")




// update searchTerm in state based on input field value
const updateSearchTerm = (event) => {
  setSearchTerm(event.target.value)
  // console.log(searchTerm)
}



//make ajax request for search term and display data
const handleSubmit = (event) => {
//prevent page reload
event.preventDefault()
// make ajax request for search term with api key
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
//convert response to javascript object
.then(response => response.json())
//data from api  as javascript object
.then(data => { 
  setSearchTerm("")
  if(data.message) {
    console.log(data.message)
    setMessage(data.message)
    console.log("what is hapening")
    setDisplayTemperature(false)
    console.log("again")
  } else {
  setDisplayTemperature(null)
  setMessage('')
  }
})
.catch(()=> setMessage("error"))
}




  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Weather Finder </label>
        <input onChange={updateSearchTerm} placeholder='Location' type="text" value={cityName}/>
        <input type="submit" value="weather info"/>
      </form>
    <div>
      <p>{message}</p>
      <h4>{displayTemerature.name}, {displayTemerature.sys.country} </h4>
      <h1>{Math.round((displayTemerature.main.temp  - 273.15) * 9/5 + 32)
} °F</h1>
      <h3>{displayTemerature.weather[0].description}</h3>
    </div>
    </div>
  );
}

export default App;
