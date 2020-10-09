import React, { useReducer } from "react";
import { v4 } from "uuid";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //   Set Alert
  const setAlert = (alert) => {
    if (!alert) return;

    const id = v4();
    dispatch({
      type: SET_ALERT,
      payload: { alert, id },
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, 3000);
  };

  // Remove Alert

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
