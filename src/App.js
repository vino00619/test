/* eslint-disable jsx-a11y/anchor-is-valid */
import data from "./data";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";


const TabCol = Object.keys(data[0]);
// console.log(TabCol);

const TabHead = () => {
  return TabCol.map((data, index) => {
    //console.log(data);
    return <th key={index}>{data}</th>;
  });
};

const TabData = () => {
  return data.map((data) => {
    return (
      <tr>
        {TabCol.map((i) => {
          return <td>{data[i]}</td>;
        })}
      </tr>
    );
  });
};

const uniqueCity = [...new Set(data.map((item) => item.City))];
console.log("unique city", uniqueCity);

const uniqueDistrict = [...new Set(data.map((item) => item.District))];
console.log("unique city", uniqueCity);

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [street, setStreet] = useState([]);

 

  function ButtonClick() {
    const filteredData = data
      .filter((d) => {
      if(d.City === selectedCity){console.log("city", d)};
        return d.City.trim() === selectedCity.trim();
      })
      .filter((d) => {
      if(d.District === selectedDistrict){console.log("dist", d)};
        return d.District.trim() === selectedDistrict.trim();
      })
      .map((d) => d.Street);

      console.log(filteredData);

      const uniqueFilteredData = [...new Set(filteredData)];
      setStreet(uniqueFilteredData)
      // console.log(uniqueFilteredData);
  }
  

  return (
    <div>
      <table className="table">
        <thead>
          <tr>{TabHead()}</tr>
        </thead>
        <tbody>{TabData()}</tbody>
      </table>

      <div class="btn-group">
        <button
          type="button"
          class="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedCity ? selectedCity : "Select City"}
        </button>
        <ul
          class="dropdown-menu"
          onClick={(e) => {
            setSelectedCity(e.target.innerText)
            e.preventDefault()
            }}
        >
          {uniqueCity.map((d) => {
            return (
              <div>
                {" "}
                <li>
                  <a class="dropdown-item" href="#">
                    {d}
                  </a>
                </li>
              </div>
            );
          })}
        </ul>
      </div>

      <div class="btn-group">
        <button
          type="button"
          class="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedDistrict ? selectedDistrict : "Selected District"}
        </button>
        <ul
          class="dropdown-menu"
          onClick={(e) => {
            setSelectedDistrict(e.target.innerText)
            e.preventDefault()
            }}
        >
          {uniqueDistrict.map((d) => {
            return (
              <div>
                {" "}
                <li>
                  <a class="dropdown-item" href="#">
                    {d}
                  </a>
                </li>
              </div>
            );
          })}
        </ul>
      </div>

      <button type="button" class="btn btn-success" onClick={ButtonClick}>
        Success
      </button>

      {street.map((d) => {
            return (
              <p>
                {d}
              </p>
            );
          })}

    </div>
  );
}

export default App;
