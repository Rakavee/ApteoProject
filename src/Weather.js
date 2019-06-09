import React, { PureComponent } from "react";
import "./Weather.css"

//variable to store the API key for openweather
const APP_KEY = "2d7d2352ae28fbba568456df7c73bd09"

//Component to display the dropdown to select city and display weather accordingly.
export default class Weather extends PureComponent {
    //Constructor to initialize state properties.
    constructor(props){
        super(props);
        this.state = {
            temperature : undefined,
            city : undefined,
            description : undefined,
            min_temp : undefined,
            max_temp : undefined,
            wind : undefined,
            isToggle : false //To hide and unhide the section to display the weather information.
          };
        this.initialState = this.state //Initialstate variable reset the state.
    }

    //Function to handle change of selected city.
    handleChange(event) {
      //In case of no city selected, alert to select a city.
      if(event.target.value === "0"){
        this.setState(this.initialState, () => {  //set to original state.
          alert("Please select a city.")
      });
        
      }
      //When a city is selected, update the state with the selected city and call followup function.
      else{
          //Since setState is asynchronous, give followup commands within the call back to ensure that the state is updated.
          this.setState({ city: event.target.value }, () => { 
          //console.log(this.state.city);
          this.get_weather();
      });
      }
      
    }

    //Function to handle api call and set state based on the api result.
    get_weather = async ()=> {
        console.log(this.state.city)
        const city = this.state.city
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_KEY}&units=metric`); //API call to fetch weather information based on the city name. APP_KEY is required.
        const api_call_result = await api_call.json(); 
        //On successful API Call fetch and update the required information.
        if(api_call_result.cod === 200){
          console.log(api_call_result)
          this.setState({
              temperature : api_call_result.main.temp,
              city : api_call_result.name,
              description : api_call_result.weather[0].description,
              min_temp : api_call_result.main.temp_min,
              max_temp : api_call_result.main.temp_max,
              wind : api_call_result.wind.speed,
              isToggle : true
          });
        }
        //When API call fails, notify the user and admin.
        else{
          alert("Failed loading information. Error notice sent to admin. Please try again later.")
          console.log("API call failed.") //Can include any action to notify and resolve any API related issue.
        }
        
        
    }
  render() {
      
    return (
      
      <div className = "main">
         {/* Dropdown Menu */}
        <section name = "dropdown">
            <select value={this.state.city} onChange={this.handleChange.bind(this)}>
              <option value="0">City, Country</option>
              <option value="Bangkok">Bangkok, Thailand</option>
              <option value="Chennai">Chennai, India</option>
              <option value="Dubai">Dubai, UAE</option>
              <option value="Istanbul">Istanbul, Turkey</option>
              <option value="London">London, England</option>
              <option value="New York">New York, USA</option>
              <option value="San Francisco">San Francisco, USA</option>
              <option value="Shanghai">Shanghai, China</option>
              <option value="Sydney">Sydney, Australia</option>
              <option value="Tokyo">Tokyo, Japan</option>
            </select>
        </section>
        {/* Weather information display area */}
        <section style={{display: this.state.isToggle ? 'block': 'none'}}>
          <h4><p>City  : {this.state.city}</p>
          <p>Temperature  : {this.state.temperature}</p>
          <p>Description  : {this.state.description}</p>
          <p>Minimum Temperature  : {this.state.min_temp}</p>
          <p>Maximum Temperature  : {this.state.max_temp}</p>
          <p>Wind Speed  : {this.state.wind}</p></h4>
        </section>
      </div>
    );
  }
}
