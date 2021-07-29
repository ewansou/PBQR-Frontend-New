import { GET_OMISE_QR } from "../actions/types";

let initialState = {
  information: [],
  isLoading: true,
};

function postRequestReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OMISE_QR:
      console.log("state is below");
      console.log(state);
      console.log("payload is below");
      console.log(payload);
      const newPayLoad = {
        ...state,
        information: [action.payload],
        isLoading: false,
      };
      console.log(newPayLoad);
      return {
        ...state,
        information: [action.payload],
        isLoading: false,
      };

    default:
      return state;
  }
}

export default postRequestReducer;
