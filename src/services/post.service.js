import axios from "axios";

const getQRimage = (amount) => {
  const URL = "http://localhost:6868/api/payment/";
  const reqURL = URL + amount;
  return axios.post(reqURL, {
    //no data posted
  });
};

const PostService = {
  getQRimage,
};

export default PostService;
