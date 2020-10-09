import React, { useContext } from "react";

import AlertContext from "../context/alert/AlertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);

  if (alertContext.alerts) {
    if (alertContext.alerts.alert.message) {
      return <div className="alert">{alertContext.alerts.alert.message}</div>;
    }
    return <div className="alert">{alertContext.alerts.alert}</div>;
  } else return null;
};

export default Alert;
