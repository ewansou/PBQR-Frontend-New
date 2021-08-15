import React from "react";
import { useHistory } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import instantlysgLogo from "../images/instantlysg-logo.png";

function PaymentSuccessGIF4() {
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
    <div className="paymentSuccessGIF4Div">
      <h1 className="paymentSuccessGIF4Text">PAYMENT SUCCESS</h1>
      <h1 className="paymentSuccessGIF4ThankYou">THANK YOU</h1>
      <h1 className="paymentSuccessGIF4Message">
        Photo taking session will begin shortly ...
      </h1>
      <span className="paymentSuccessGIF4CountDown">
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
      <div className="paymentSuccessGIF4LogoDiv">
        <p className="paymentSuccessGIF4Presented">Presented to you by:</p>
        <img src={instantlysgLogo} className="paymentSuccessGIF4Logo" />
      </div>
    </div>
  );
}

export default PaymentSuccessGIF4;
