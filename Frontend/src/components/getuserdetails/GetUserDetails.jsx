import React, { useState,useEffect } from 'react'
import "./getuser.scss";

import ChooseState from './state/ChooseState';
import ChooseDistrict from './district/ChooseDistrict';
const GetUserDetails = ({ pageNo }) => {
  const [pageNumber, setPageNumber] = useState(pageNo);

    useEffect(()=>{

    },[pageNo])
  const nextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const previousPage = () => {
    setPageNumber(pageNumber - 1)
  }

  return (
    <div className='getuserdetails'>
      {pageNumber == 1 ? <ChooseState /> : <ChooseDistrict />}
      <div className='btns'>
      <button
        onClick={previousPage}
        disabled={pageNumber == 1 ? true : false}>Previous
      </button>
      {pageNumber == 1 ?
      <button
        onClick={nextPage}
        disabled={pageNumber == 2 ? true : false} >Next
      </button>
:<a href='/'></a>
}
      </div>
    </div>
  )
}

export default GetUserDetails