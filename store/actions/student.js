import {jwtDecode} from 'jwt-decode';

import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SIGNIN,
  SIGNUP,
  LOAD,
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

export const load = (error, success) =>
  Helpers.api(
    '/student/load',
    'GET',
    {},
    { error, success },
    { error: ERROR, loading: LOADING, responder: LOAD }
  );