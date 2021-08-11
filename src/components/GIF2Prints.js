import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getOmiseQR } from "../actions/getQRimage";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function GIF2Prints() {
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
  const amount = "1000"; //Change here
  const dollarAmount = "$" + amount / 100;
  const [data, updateData] = useState("Pending...");
  const isInitialMount = useRef(true);
  let sseSource = {};

  useEffect(() => {
    console.log("initial mount");
    console.log(isInitialMount);
    setTimeout(function () {
      dispatch(getOmiseQR(amount));
    }, 2000);
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
        history.push("/paymentsuccess");
      };
    }
  });

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
  `;
  let [color, setColor] = useState("#ffffff");

  const style = {
    height: "80vh",
    margin: "40px",
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid container item xs={6} className="makePaymentLeft">
          <Grid item xs={12} container={true}>
            <Paper elevation={0}></Paper>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={12} container={true} style={style}>
            {postRequestStateObject.isLoading ? (
              <ClipLoader color={color} css={override} size={150} />
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
                        duration={120}
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
                  <a href="/" className="makePaymentBackButton">
                    BACK
                  </a>
                </div>
              )
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>

    // <div>
    //   <p>Photo</p>
    //   <p>Paying amount: {dollarAmount}</p>

    // {postRequestStateObject.isLoading ? (
    //   <ClipLoader color={color} css={override} size={150} />
    // ) : (
    //   postRequestStateObject.information[0] && (
    //     <div>
    //       <p>{postRequestStateObject.information[0].chargeID}</p>
    //       <p>{postRequestStateObject.information[0].sseEndpoint}</p>
    //       <p>{postRequestStateObject.isLoading.toString()}</p>
    //       <img src={postRequestStateObject.information[0].imageURL} />

    //       <CountdownCircleTimer
    //         onComplete={() => {
    //           sseSource.close();
    //           history.push("/");
    //           return [true, 1500]; // repeat animation in 1.5 seconds
    //         }}
    //         isPlaying
    //         duration={20}
    //         colors={[
    //           ["#004777", 0.33],
    //           ["#F7B801", 0.33],
    //           ["#A30000", 0.33],
    //         ]}
    //       >
    //         {renderTime}
    //       </CountdownCircleTimer>
    //     </div>
    //   )
    // )}

    //   <div>{data}</div>
    //   <Button variant="contained" color="primary">
    //     <Link href="/">BACK TO HOME</Link>
    //   </Button>
    // </div>
  );
}

export default GIF2Prints;
