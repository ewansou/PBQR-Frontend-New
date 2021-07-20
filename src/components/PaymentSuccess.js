import React from "react";

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

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Starting Photo Booth...</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
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
              isPlaying
              duration={5}
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
