const userState  = localStorage.getItem('userState');
const userDistrict  = localStorage.getItem('userDistrict');

const initialState = {
  userState: userState != null ? userState : 'TN',
  userDistrict: userDistrict != null ? userDistrict : "Ariyalur",
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSER":
      return {
        ...state,
        userState: action.userState,
        userDistrict: action.userDistrict,
      };
    case "GETUSER":
      return state;

    default:
      return state;
  }
};

export default userDetailsReducer;
