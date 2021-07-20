import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getOmiseQR } from "../actions/getQRimage";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

function Photo10() {
  const postRequestStateObject = useSelector(
    (state) => state.postRequestReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const amount = "1000"; //Change here
  const dollarAmount = "$" + amount / 100;

  useEffect(() => {
    dispatch(getOmiseQR(amount));
    console.log("Only render on first render");
    console.log("SSE end point is: " + postRequestStateObject.sseEndpoint);
  }, []);

  const [data, updateData] = useState("Pending payment...");

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log("sseEndPoint changed");
      console.log("SSE end point is: " + postRequestStateObject.sseEndpoint);

      const source = new EventSource(postRequestStateObject.sseEndpoint);
      source.onmessage = function logEvents(event) {
        updateData(event.data);
        history.push("/paymentsuccess");
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

  return (
    <div>
      <p>Photo</p>
      <p>Paying amount: {dollarAmount}</p>
      <p>{postRequestStateObject.chargeID}</p>
      <p>{postRequestStateObject.sseEndpoint}</p>
      <img src={postRequestStateObject.imageURL} />

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

      <div>{data}</div>
      <Button variant="contained" color="primary">
        <Link href="/">BACK TO HOME</Link>
      </Button>
    </div>
  );
}

export default Photo10;
