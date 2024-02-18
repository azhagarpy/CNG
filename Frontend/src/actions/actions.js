export const setSearch = (value) => {
  return {
    value: value,
    type: "SETSEARCH",
  };
};

export const setUser = (userDistrict, userState) => {
  return {
    userDistrict,
    userState,
    type: "SETSEARCH",
  };
};

export const getSearch = () => {
  return {
    type: "GETSEARCH",
  };
};

export const getUser = () => {
  return {
    type: "GETUSER",
  };
};
