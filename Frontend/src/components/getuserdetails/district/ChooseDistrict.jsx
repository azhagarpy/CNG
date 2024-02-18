import React from 'react'
import DistrictsByState from '../../../assets/DistrictsByStates'
import { useDispatch,useSelector } from 'react-redux'
const ChooseDistrict = () => {

    const userState = localStorage.getItem('userState')
    const dispatch = useDispatch();
    const districts = DistrictsByState.filter(item => item.STATION_STATE === userState);
const data = useSelector(state=>state.user)

    const chooseDistrict = (district) => {
        localStorage.setItem('userDistrict', district)
        dispatch({type:"SETUSER",userDistrict:district,userState:data.userState})
    }


    return (
        <div className='choosestate'>
            <h1>Choose Your District</h1>
            {districts.map((e, index) => {
                return (
                    <p key={index} className='state choosestateitem' onClick={() => { chooseDistrict(e.STATION_DISTRICT) }}> {e.STATION_DISTRICT} </p>
                )
            })}
        </div>
    )

}

export default ChooseDistrict