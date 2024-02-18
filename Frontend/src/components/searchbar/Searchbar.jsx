import React, { useState, useEffect } from 'react'
import "./searchbar.scss";
import { FaLocationArrow, FaEdit } from "react-icons/fa"
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import DistrictsByState from '../../assets/DistrictsByStates';


const Searchbar = () => {
  const [searchValue, setSearchValue] = useState([])
  const [showResult, setShowRestult] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const { value } = useSelector(state => state.search)
  const dispatch = useDispatch();
  const handelChange = (txt) => {
    if (txt !== null) {
      const trimmedText = txt.trim(); // Remove leading and trailing whitespaces

      if (trimmedText !== "") {
        setShowClear(true);
        const filteredResults = DistrictsByState.filter((e) =>
          e.STATION_DISTRICT.toLowerCase().includes(trimmedText.toLowerCase()) ||
          e.STATION_STATE.toLowerCase().includes(trimmedText.toLowerCase())
        );

        setSearchValue(filteredResults);
      } else {
        setSearchValue([]); // Clear the results if the input is empty
      }
    }
  };
  useEffect(() => {
  }, [])
  return (
    <>
      <div className='searchbar'>
        <div className='logo'>
          <img src='./cng.png' />
        </div>
        <div className='searchbox'>
          <input type='text' placeholder='search by locations...' className='searchboxvalue'
            onChange={(event) => {
              handelChange(event.target.value)
              setShowRestult(true);
            }}
          />
        </div>
        <div className='search-right-icons'>
          {showClear &&
            <IoIosClose size={40} onClick={() => {
              setShowClear(false)
              document.querySelector('.searchboxvalue').value = "";
            }} />
          }
          <span className='changeLocation' onClick={
            () => {
              console.log("clicked")
              localStorage.setItem("userState", "no")
              localStorage.setItem("userDistrict", "no")
              window.location = "/"
            }
          }><FaEdit />
            <small className='changeUserLocation'>Change User location</small>
          </span>


        </div>
      </div>
      <p className='results'>
        {searchValue && showResult && searchValue.slice(0, 10).map((e, index) => {
          return (
            <p className='result'
              key={index}
              onClick={() => {
                if (value != e.STATION_DISTRICT) {
                  dispatch({ type: "SETSEARCH", value: e.STATION_DISTRICT })
                }
                setShowRestult(false)
              }}
            >{e.STATION_DISTRICT}</p>
          )
        })}
      </p>
    </>
  )
}

export default Searchbar