import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SIGNIN,
  SIGNUP,
  AUTH_INITIALIZED,
  LOAD,
} from '../types';

export const initialState = {
  email: '',
  firstname: '',
  lastname: '',
  matricNo: '',
  department: '',
  faculty: '',
  level: '',
  token: '',
  loading: [],
  authenticated: false,
  initialized: false,
};

export default function (state = initialState, action) {
  const { loading } = state;
  const { payload } = action;

  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: loading.some((item) => item === payload)
          ? loading.filter((item) => item !== payload)
          : [...loading, payload],
      };

    case SIGNIN:
      return {
        ...state,
        ...payload.user,
        token: payload.token,
        authenticated: true,
      };

    case SIGNUP:
      return {
        ...state,
      };

    case LOAD:
      return {
        ...state,
        ...payload.user,
        authenticated: true,
      };

    case AUTH_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    case ERROR:
      if (payload && payload.data && payload.data.error) {
        payload.data.error.map((err) =>
          Helpers.notification.error(err)
        );
      } else if (payload && payload.message) {
        Helpers.notification.error(payload.message);
      } else {
        Helpers.notification.error(
          'Unfortunately we were unable to fetch some data. Try again.'
        );
      }

      return state;

    default:
      return state;
  }
}