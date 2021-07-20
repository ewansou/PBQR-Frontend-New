import { GET_OMISE_QR } from "../actions/types";

let initialState = {};

function postRequestReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case GET_OMISE_QR:
      console.log(payload);
      return payload;

    default:
      return state;
  }
}

export default postRequestReducer;
