import React, { useEffect } from 'react'
import { getStatesOfCountry } from 'country-state-city/lib/state';
import { useDispatch, useSelector } from 'react-redux';
import DistrictsByState,{uniqueStates}  from "../../../assets/DistrictsByStates"
const ChooseState = () => {
    const indiaStates = getStatesOfCountry('IN');
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.user);

    const uniqueStatesList = uniqueStates(DistrictsByState)

    useEffect(() => {
    }, [])
    const selectState = (state) => {

        dispatch({ type: "SETUSER", userState: state, userDistrict: "giong to choose" });

        localStorage.setItem('userState', state);


    }

    return (
        <div className='choosestate'>
            <h1>Choose Your State</h1>
            {uniqueStatesList.map((e,index) => {
                return (
                    <p key={index} className={userDetails.userState == e ? 'choosestateitem clicked' : 'choosestateitem' }onClick={() => selectState(e)}  > {e} </p>
                )
            })}
        </div>
    )
}

export default ChooseState