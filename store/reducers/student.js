import * as Helpers from '../../helpers';

import {ERROR, LOADING, SIGNIN, SIGNUP, LOAD} from '../types';

export const initialState = {
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  matricNo: '',
  department: '',
  faculty: '',
  level: '',
};

export default function (state = initialState, action) {
  const {loading} = state;
  const {payload} = action;
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
      };

    case SIGNUP:
      return {
        ...state,
      };

    case ERROR:
      if (payload && payload.data && payload.data.error) {
        payload.data.error.map((err) => Helpers.notification.error(err));
      } else if (payload && payload.message) {
        Helpers.notification.error(payload.message);
      } else {
        Helpers.notification.error('Unfortunately we were unable to fetch some data. Try again.');
      }
      return state;

    case LOAD:
      const {
        data: {
          email,
          firstname,
          lastname,
          password,
          matricNo,
          department,
          faculty,
          level,
        },
      } = payload;
      return {
        ...state,
        email,
        firstname,
        lastname,
        password,
        matricNo,
        department,
        faculty,
        level,
      };
    default:
      return state;
  }
}
