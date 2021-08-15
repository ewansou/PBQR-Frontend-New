import React from "react";
import { useHistory } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import instantlysgLogo from "../images/instantlysg-logo.png";

function PaymentSuccessGIF6() {
  const history = useHistory();

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Redirecting back...</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  return (
    <div className="paymentSuccessGIF6Div">
      <h1 className="paymentSuccessGIF6Text">PAYMENT SUCCESS</h1>
      <h1 className="paymentSuccessGIF6ThankYou">THANK YOU</h1>
      <h1 className="paymentSuccessGIF6Message">
        Photo taking session will begin shortly ...
      </h1>
      <span className="paymentSuccessGIF6CountDown">
        <CountdownCircleTimer
          onComplete={() => {
            history.push("/");
            return [true, 1500];
          }}
          isPlaying
          duration={20} //20 seconds
          size={0}
          colors="#e3e3e3"
        >
          {renderTime}
        </CountdownCircleTimer>
      </span>
      <div className="paymentSuccessGIF6LogoDiv">
        <p className="paymentSuccessGIF6Presented">Presented to you by:</p>
        <img src={instantlysgLogo} className="paymentSuccessGIF6Logo" />
      </div>
    </div>
  );
}

export default PaymentSuccessGIF6;
