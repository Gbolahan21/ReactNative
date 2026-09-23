import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SIGNIN,
  SIGNUP,
  AUTH_INITIALIZED,
  LOAD,
  STUDENT_UPDATE,
  LOOKUPS,
  COURSES,
  REGISTER_COURSE
} from '../types';

export const initialState = {
  email: '',
  firstname: '',
  lastname: '',
  matricNo: '',
  department: '',
  faculty: '',
  level: '',
  gender: '',
  token: '',
  loading: [],
  authenticated: false,
  initialized: false,
  faculties: [],
  departments: [],
  levels: [],
  semesters: [],
  courses: [],
  semester: ''
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
        ...payload.student,
        token: payload.token,
        authenticated: true,
      };

    case SIGNUP:
      return {
        ...state,
      };

    case REGISTER_COURSE:
      return {
        ...state,
      };

    case LOAD:
      return {
        ...state,
        ...payload.student,
        authenticated: true,
      };

    case LOOKUPS:
      return {
        ...state,
        faculties: payload.faculties,
        departments: payload.departments,
        levels: payload.levels,
        semesters: payload.semesters,
      };
    
    case COURSES:
      return {
        ...state,
        courses: payload.courses,
        semester: payload.semester,
      };

    case STUDENT_UPDATE:
      return {
        ...state,
        ...payload.student,
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