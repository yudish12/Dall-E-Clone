export const userReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_REQ":
      return { ...state, loading: true };

    case "AUTH_SUCCESS":
      return { ...state, loading: false, user: action.payload };

    case "AUTH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "LOGOUT":
      return { ...state, user: {}, loading: false };

    default:
      return state;
  }
};
