const userReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_USER":
      return state;

    case "SET_USER":
      return action.type;

    default:
      return state;
  }
};

export default userReducer;
