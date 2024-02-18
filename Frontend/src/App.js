import React from "react";
import Homepage from "./pages/Homepage/Homepage";
import { useDispatch,useSelector } from "react-redux";
import GetUserDetails from "./components/getuserdetails/GetUserDetails";


function App() {

const sdata = useSelector(state=>state.search)
const udata = useSelector(state=>state.user)
const dispatch = useDispatch();

console.log(localStorage.getItem('userState'))
if(localStorage.getItem('userState')==null || localStorage.getItem('userState')== "no"){
  return <GetUserDetails pageNo={1} />
}

if(window.localStorage.getItem('userDistrict')==null || localStorage.getItem('userDistrict')=="no"){
  return <GetUserDetails pageNo={2} />
}


  return (
    <div className="App">
      <Homepage google={"faaaa"} />
    </div>
  );
}

export default App;
