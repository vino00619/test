/* eslint-disable jsx-a11y/anchor-is-valid */
import data from "./data";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [tableData, setTableData] = useState(data);

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
    return tableData.map((data) => {
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

  // filtering the data based on city and district and mapping its values
  function filterTable() {
    if (selectedCity && selectedDistrict) {
      const filterResults = data
        .filter((data) => data.City.trim() === selectedCity.trim())
        .filter((data) => data.District.trim() === selectedDistrict.trim());
      setTableData(filterResults);
    }
  }

  function resetFilter() {
    setSelectedCity(null);
    setSelectedDistrict(null);
    setTableData(data);
  }

  return (
    <div>
      {/* -------------Header-------------- */}
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

      {/* -------------Buttons-------------- */}
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

        <button type="button" class="btn btn-success" onClick={filterTable}>
          Search
        </button>
        <button type="button" class="btn btn-secondary" onClick={resetFilter}>
          Reset
        </button>
      </div>

      {/* -------------Table-------------- */}

      <table className="table">
        <thead>
          <tr>{TabHead()}</tr>
        </thead>
        <tbody>{TabData()}</tbody>
      </table>

      {/* -------------Footer-------------- */}
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