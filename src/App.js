import React from "react";
import { Router, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Photo10 from "./components/Photo10";
import PhotoGIF12 from "./components/PhotoGIF12";
import PhotoBoomerang12 from "./components/PhotoBoomerang12";
import PaymentSuccess from "./components/PaymentSuccess";

import DynamicLayout from "./router/DynamicLayout";

import { history } from "./helpers/history";

const App = () => {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <DynamicLayout
            exact
            path="/"
            component={LandingPage}
            layout="LANDING_NAV"
          />
          <DynamicLayout
            exact
            path="/photo10"
            component={Photo10}
            layout="PHOTO10_PAGE"
          />
          <DynamicLayout
            exact
            path="/photogif12"
            component={PhotoGIF12}
            layout="PHOTOGIF12_PAGE"
          />
          <DynamicLayout
            exact
            path="/photoboomerang12"
            component={PhotoBoomerang12}
            layout="PHOTOBOOMERANG12_PAGE"
          />
          <DynamicLayout
            exact
            path="/paymentsuccess"
            component={PaymentSuccess}
            layout="PAYMENTSUCCESS_PAGE"
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
