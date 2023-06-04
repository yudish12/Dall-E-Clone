export const postReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_POSTS_REQ":
      return { ...state, loading: true };
    case "FETCH_POSTS_SUCCESS":
      return { ...state, posts: action.payload, loading: false };
    case "SEARCH_POSTS_REQ":
      return {
        ...state,
        loading: true,
        searchQuery: action.payload.toLowerCase(),
      };
    case "SEARCH_POSTS_SUCCESS":
      return { ...state, loading: false, searchQuery: "" };
    default:
      return { ...state, loading: false };
  }
};
