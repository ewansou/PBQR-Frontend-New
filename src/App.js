import React from "react";
import { Router, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import GIF2Prints from "./components/GIF2Prints";
import GIF4Prints from "./components/GIF4Prints";
import GIF6Prints from "./components/GIF6Prints";
import PaymentSuccessGIF2 from "./components/PaymentSuccessGIF2";
import PaymentSuccessGIF4 from "./components/PaymentSuccessGIF4";
import PaymentSuccessGIF6 from "./components/PaymentSuccessGIF6";

import DynamicLayout from "./router/DynamicLayout";

import { history } from "./helpers/history";

const App = () => {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <DynamicLayout
            exact
            path="/gif2prints"
            component={GIF2Prints}
            layout="GIF2PRINTS_PAGE"
          />
          <DynamicLayout
            exact
            path="/gif4prints"
            component={GIF4Prints}
            layout="GIF4PRINTS_PAGE"
          />
          <DynamicLayout
            exact
            path="/gif6prints"
            component={GIF6Prints}
            layout="GIF6PRINTS_PAGE"
          />
          <DynamicLayout
            exact
            path="/paymentsuccessgif2"
            component={PaymentSuccessGIF2}
            layout="PAYMENTSUCCESSGIF2_PAGE"
          />
          <DynamicLayout
            exact
            path="/paymentsuccessgif4"
            component={PaymentSuccessGIF4}
            layout="PAYMENTSUCCESSGIF4_PAGE"
          />
          <DynamicLayout
            exact
            path="/paymentsuccessgif6"
            component={PaymentSuccessGIF6}
            layout="PAYMENTSUCCESSGIF6_PAGE"
          />
          <DynamicLayout
            exact
            path="/"
            component={LandingPage}
            layout="LANDING_NAV"
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
