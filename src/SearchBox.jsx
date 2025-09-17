import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "019bc09a3ce7865065de3e4f091fb396";

    let getWhetherInfo = async () => {
       let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
       let jsonResponse = await response.json();
        console.log(jsonResponse);
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feels_like: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        }
        console.log(result);
        return result;
    }

    

    let handleChange = (event) => {
        setCity(event.target.value);

    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        console.log(city);
        setCity("");
        let newinfo = await getWhetherInfo();
        updateInfo(newinfo);
    }


  return (
    <>
      {/* <h2>Search for the whether</h2> */}
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="City Name"
          variant="standard"
          style={{ Color: "pink" }}
          required
          value={city}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">Search</Button>
      </form>
    </>
  );
}
