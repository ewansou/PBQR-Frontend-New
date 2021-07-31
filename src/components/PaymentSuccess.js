import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function PaymentSuccess() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  const history = useHistory();

  // useEffect(() => {
  //   console.log("On component mount, status is");
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log("On component unmount, status is");
  //     setInitialMount(true);
  //     console.log(initialMount);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (ewan !== false) {
  //     console.log("On change in status,");
  //     // console.log(history.length);
  //     console.log(ewan);
  //     // history.push("/");
  //     history.replace("/");
  //   }
  // }, [ewan]);

  // const isInitialMountTT = useRef(true);
  // useEffect(() => {
  //   if (isInitialMountTT.current) {
  //     isInitialMountTT.current = false;
  //     console.log("Initial Mount here");
  //     console.log(isInitialMountTT.current.toString());
  //   } else {
  //     console.log("Second Mount here");
  //     console.log(isInitialMountTT.current.toString());
  //     // history.push("/");
  //     isInitialMountTT.current = true;
  //   }
  // }, [isInitialMountTT]);
  // const state = { redirect: null };
  // if (this.state.redirect) {
  //   return <Redirect to={this.state.redirect} />
  // }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Starting...</div>;
    }
    return (
      <div className="timer">
        <div className="text">
          Payment success
          <br />
          redirecting in
        </div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={6} sm={6}>
          <Paper
            className="paymentSuccessLeftPaper"
            variant="outlined"
            square
          ></Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper className="paymentSuccessRightPaper" variant="outlined" square>
            <h1>Payment Success</h1>
            <CountdownCircleTimer
              onComplete={() => {
                history.push("/");
                return [true, 1500];
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
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default PaymentSuccess;
