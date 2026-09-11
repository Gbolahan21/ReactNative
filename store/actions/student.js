import {jwtDecode} from 'jwt-decode';

import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SIGNIN,
  SIGNUP,
} from '../types';

export const signup = (firstname, lastname, matricNo, email, department, faculty, level, password, error, success) => 
  Helpers.api(
  '/student/signup',
  'POST',
  {
    firstname,
    lastname,
    matricNo,
    email,
    department,
    faculty,
    level,
    password,
  },
  { error, success },
  { error: ERROR, loading: LOADING, responder: SIGNUP }
);

export const signin = (matricNo, password, error, success) =>
  Helpers.api(
    '/student/signin',
    'POST',
    { matricNo, password },
    { error, success },
    { error: ERROR, loading: LOADING, responder: SIGNIN }
  );