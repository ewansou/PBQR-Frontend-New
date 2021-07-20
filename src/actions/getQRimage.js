import postService from "../services/post.service";
import { GET_OMISE_QR } from "./types";

export const getOmiseQR = (amount) => async (dispatch) => {
  try {
    const res = await postService.getQRimage(amount);
    dispatch({
      type: GET_OMISE_QR,
      payload: res.data,
    });
    return Promise.resolve(res.data); 
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
