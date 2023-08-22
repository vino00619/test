/* eslint-disable jsx-a11y/anchor-is-valid */
import data from "./data";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

//filtering all the keysvalues for table column
const TabCol = Object.keys(data[0]);
//console.log(TabCol);

//mapping all the keysvalues into table column
const TabHead = () => {
  return TabCol.map((data, index) => {
    //console.log(data);
    return <th key={index}>{data}</th>;
  });
};

//mapping all the data into table data
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

//getting unique city names for dropdown
const uniqueCity = [...new Set(data.map((item) => item.City))];
//console.log("unique city", uniqueCity);

//getting unique district names for dropdown
const uniqueDistrict = [...new Set(data.map((item) => item.District))];
//console.log("unique city", uniqueCity);

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [street, setStreet] = useState([]);

  // filtering the data based on city and district and mapping its values
  function ButtonClick() {
    const filteredData = data
      .filter((d) => {
        if (d.City === selectedCity) {
          console.log("city", d);
        }
        return d.City.trim() === selectedCity.trim();
      })
      .filter((d) => {
        if (d.District === selectedDistrict) {
          console.log("dist", d);
        }
        return d.District.trim() === selectedDistrict.trim();
      })
      .map((d) => d.Street);

    console.log(filteredData);

    // getting unique values in filtered data
    const uniqueFilteredData = [...new Set(filteredData)];
    setStreet(uniqueFilteredData);
    // console.log(uniqueFilteredData);
  }

  return (
    <div>
      <nav
        class="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1" style={{ fontSize: 50 }}>
            Table
          </span>
        </div>
      </nav>

      <table className="table">
        <thead>
          <tr>{TabHead()}</tr>
        </thead>
        <tbody>{TabData()}</tbody>
      </table>

      <div class="tableFunction">
        <div class="btn-group">
          <button
            style={{ marginRight: "10px" }}
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
              setSelectedCity(e.target.innerText);
              e.preventDefault();
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
            style={{ marginRight: "10px" }}
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
              setSelectedDistrict(e.target.innerText);
              e.preventDefault();
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
        <div style={{ margin: "auto", paddingLeft: "10px" }}>
          {street.map((d) => {
            return <p>{d}</p>;
          })}
        </div>
      </div>
      <nav
        class="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1" style={{ fontSize: 30 }}>
            Footer
          </span>
        </div>
      </nav>
    </div>
  );
}

export default App;
