import { GET_OMISE_QR } from "../actions/types";
import { REVERT_TO_INITIAL_STATE } from "../actions/types";

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
      // const newPayLoad = {
      //   ...state,
      //   information: [action.payload],
      //   isLoading: false,
      // };
      //console.log(newPayLoad);
      return {
        ...state,
        information: [action.payload],
        isLoading: false,
      };

    case REVERT_TO_INITIAL_STATE:
      console.log("Reverting state...");
      
      // If straight return initialState got property 0 undefined BECAUSE initialState is an object object
      // return {
      //   initialState,
      // };

      return {
        information: [],
        isLoading: true,
      };

      //BELOW will also work
      // return {
      //   ...state,
      //   information: [],
      //   isLoading: true,
      // };

    default:
      return state;
  }
}

export default postRequestReducer;
