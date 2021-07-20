import React from "react";

const DynamicLayout = (props) => {
  const { component: RoutedComponent, layout } = props;

  const actualRouteComponent = <RoutedComponent {...props} />;

  switch (layout) {
    case "LANDING_NAV": {
      return <>{actualRouteComponent}</>;
    }

    case "PHOTO10_PAGE": {
      return <>{actualRouteComponent}</>;
    }

    case "PHOTOGIF12_PAGE": {
      return <>{actualRouteComponent}</>;
    }

    case "PHOTOBOOMERANG12_PAGE": {
      return <>{actualRouteComponent}</>;
    }

    case "PAYMENTSUCCESS_PAGE": {
      return <>{actualRouteComponent}</>;
    }

    default: {
      return (
        <>
          <h2>Default Nav</h2>
          {actualRouteComponent}
        </>
      );
    }
  }
};

export default DynamicLayout;
