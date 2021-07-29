import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getOmiseQR } from "../actions/getQRimage";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function Photo10() {
  const postRequestStateObject = useSelector(
    (state) => state.postRequestReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const amount = "1000"; //Change here
  const dollarAmount = "$" + amount / 100;

  useEffect(() => {
    setTimeout(function() {
      dispatch(getOmiseQR(amount));
    }, 5000);
    console.log("Only render on first render");
    //console.log("SSE end point is: " + postRequestStateObject.information[0].sseEndpoint);
  }, []);

  const [data, updateData] = useState("Pending payment...");

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      console.log("before here");
      console.log(isInitialMount.current.toString());
    } else {
      console.log(isInitialMount.current.toString());
      console.log("sseEndPoint changed");
      console.log("SSE end point is: " + postRequestStateObject.information[0].sseEndpoint);

      const source = new EventSource(postRequestStateObject.information[0].sseEndpoint);
      source.onmessage = function logEvents(event) {
        updateData(event.data);
        history.push("/paymentsuccess");
        isInitialMount.current = true;
      };
    }
  });

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too late...</div>;
    }

    return (
      <div className="timer">
        <div className="text">
          Please make
          <br />
          payment in
        </div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
let [color, setColor] = useState("#ffffff");

  return (
    <div>
      <p>Photo</p>
      <p>Paying amount: {dollarAmount}</p>

      {postRequestStateObject.isLoading ? (
        <ClipLoader color={color} css={override} size={150} />
      ) : (
        postRequestStateObject.information[0] && (
          <div>
            <p>{postRequestStateObject.information[0].chargeID}</p>
            <p>{postRequestStateObject.information[0].sseEndpoint}</p>
            <p>{postRequestStateObject.isLoading.toString()}</p>
            <img src={postRequestStateObject.information[0].imageURL} />

            <CountdownCircleTimer
              onComplete={() => {
                // do your stuff here
                {
                  //history.push("/");
                }
                return [true, 1500]; // repeat animation in 1.5 seconds
              }}
              isPlaying
              duration={10}
              colors={[
                ["#004777", 0.33],
                ["#F7B801", 0.33],
                ["#A30000", 0.33],
              ]}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        )
      )}

      <div>{data}</div>
      <Button variant="contained" color="primary">
        <Link href="/">BACK TO HOME</Link>
      </Button>
    </div>
  );
}

export default Photo10;
