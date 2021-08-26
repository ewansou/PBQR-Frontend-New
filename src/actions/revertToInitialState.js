import { REVERT_TO_INITIAL_STATE } from "./types";

export const revertToInitialState = () => (dispatch) => {
  dispatch({
    type: REVERT_TO_INITIAL_STATE,
  });
};
