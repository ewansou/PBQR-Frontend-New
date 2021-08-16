import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getOmiseQR } from "../actions/getQRimage";
import Grid from "@material-ui/core/Grid";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import SixStrips from "../images/makePayment6strips.png";

function GIF6Prints() {
  const useStyles = makeStyles((theme) => ({
    paper: {
      flex: 1,
      textAlign: "center",
    },
  }));

  const classes = useStyles();

  const postRequestStateObject = useSelector(
    (state) => state.postRequestReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const amount = "1400"; //Change here
  const dollarAmount = "$" + amount / 100;
  const [data, updateData] = useState("Pending...");
  const isInitialMount = useRef(true);
  let sseSource = {};

  useEffect(() => {
    console.log("initial mount");
    console.log(isInitialMount);
    dispatch(getOmiseQR(amount));

    // setTimeout(function () {
    //   dispatch(getOmiseQR(amount));
    // }, 2000);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log(
        "SSE end point is: " + postRequestStateObject.information[0].sseEndpoint
      );

      sseSource = new EventSource(
        postRequestStateObject.information[0].sseEndpoint
      );

      sseSource.onmessage = function logEvents(event) {
        updateData(event.data);
        sseSource.close();
        history.push("/paymentsuccessgif6");
      };
    }
  });

  function goBackMenu() {
    sseSource.close();
    history.push("/");
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Redirecting back...</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime} seconds</div>
      </div>
    );
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #f26522;
    margin-top: 30vh;
    width: 200px;
    height: 200px;
  `;

  const style = {
    height: "80vh",
    margin: "40px",
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid container item xs={6} className="makePaymentLeft">
          <Grid item xs={12} container={true}>
            <div className="makePaymentLeftDiv">
              <h1 className="makePaymentLeftTitle">6 Bookmark Printouts</h1>
              <span>with softcopies emailing</span>
              <img
                src={SixStrips}
                className="makePaymentLeft6BookmarkPrintoutsImage"
              />
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={12} container={true} style={style}>
            {postRequestStateObject.isLoading ? (
              <ClipLoader css={override} />
            ) : (
              postRequestStateObject.information[0] && (
                <div className="makePaymentMainDiv">
                  <p className="makePaymentInstruction">
                    Open your banking app.
                  </p>
                  <p className="makePaymentInstruction">
                    Scan the QR code below to make
                  </p>
                  <p className="makePaymentInstruction">payment via PayNow</p>
                  <p className="makePaymentWarning">
                    * DO NOT CHANGE the payment amount
                  </p>
                  <h3 className="makePaymentStatus">Status: {data}</h3>
                  <div className="makePaymentQRDiv">
                    <p className="makePaymentInText">
                      Kindly make payment in
                      <CountdownCircleTimer
                        onComplete={() => {
                          sseSource.close();
                          history.push("/");
                          return [true, 1500]; // repeat animation in 1.5 seconds
                        }}
                        isPlaying
                        duration={180}
                        size={0}
                        colors="#F26522"
                      >
                        {renderTime}
                      </CountdownCircleTimer>
                    </p>

                    <img
                      src={postRequestStateObject.information[0].imageURL}
                      className="makePaymentQRCode"
                    />
                  </div>
                  <p className="makePaymentAmount">Amount: {dollarAmount}</p>
                  <p className="makePaymentBackWarning">
                    * DO NOT touch the Back button after you've scanned and made
                    payment
                  </p>
                  <button
                    onClick={goBackMenu}
                    className="makePaymentBackButton"
                  >
                    BACK
                  </button>
                </div>
              )
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default GIF6Prints;
