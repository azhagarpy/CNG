const initialState = {
  value: "xxx",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETSEARCH":
      return {
        ...state,
        value: action.value,
      };
    case "GETSEARCH":
      return { ...state }; // Return the whole state object
    default:
      return state;
  }
};

export default searchReducer;
