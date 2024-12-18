import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";

import { NavLink } from 'react-router-dom';



function App() {

  const [temp, getTemp] = useState("");
  const [showLocationAlert, setShowLocationAlert] = useState(true);

  const handleAllowLocation = () => {
    setShowLocationAlert(false);
  };

  useEffect(() => {
    setShowLocationAlert(true);
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002");
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "weather") {
        getTemp(data.content);
      } 
    };
  
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
     {showLocationAlert && (
        <div className="alert bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative flex items-center justify-between" role="alert">
          <span className="block sm:inline">
            We use your location to display the current temperature in your area. Your location data is not stored or shared. We use your system settings to display this page in either light or dark mode. Your system settings data is not shared. Please exit the page if you do not want to use these features.
          </span>
          <div className="ml-4">
            <button onClick={handleAllowLocation} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Close
            </button>
           
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white">
        <Router>
          <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
              <NavLink to="/">   <FontAwesomeIcon icon={faNewspaper} className="h-8 dark:text-white" /> </NavLink>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight dark:text-white ml-4">
                  <NavLink to="/"> <span className="text-blue-500">today</span> news </NavLink>
                  </h1>
                </span>
              </a>
              <button
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
                          : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/search"
                      className={({ isActive }) =>
                        isActive
                          ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
                          : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                      }
                    >
                      Search
                    </NavLink>
                  </li>
                  <li>
                  {temp ? `${temp}` : ""}
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
