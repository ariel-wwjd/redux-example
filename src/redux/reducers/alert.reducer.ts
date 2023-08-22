import { StatusTheme } from '../../models/common';

const AlertTypes = {
  SET_ALERT: 'SET_ALERT',
  CLOSE_ALERT: 'CLOSE_ALERT',
};

export const setAlert = (alert: AlertData): AlertAction => ({
  type: AlertTypes.SET_ALERT,
  data: alert,
});

export const closeAlert = (show: boolean): AlertAction => ({
  type: AlertTypes.CLOSE_ALERT,
  data: show,
});

export type AlertState = {
  show: boolean;
  message?: string;
  highlight?: string;
  type: StatusTheme;
};

// INITIAL STATE
export const alertInitialState: AlertState = {
  show: false,
  message: '',
  highlight: '',
  type: 'error',
};

type AlertData = {
  message?: string;
  highlight?: string;
  type: StatusTheme;
};

export type AlertAction = {
  type: string;
  data: AlertData | boolean;
};

const alertReducer = (
  state = alertInitialState,
  action: AlertAction,
): AlertState => {
  switch (action.type) {
    case AlertTypes.SET_ALERT:
      const alert = action.data as AlertData;
      return {
        ...state,
        show: true,
        message: alert.message,
        highlight: alert.highlight,
        type: alert.type,
      };

    case AlertTypes.CLOSE_ALERT:
      const { data } = action;
      return {
        ...state,
        show: data as boolean,
      };

    default:
      return state;
  }
};

export default alertReducer;
