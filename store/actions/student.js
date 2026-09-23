import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SIGNIN,
  SIGNUP,
  LOAD,
  STUDENT_UPDATE,
  LOOKUPS,
  COURSES,
  REGISTER_COURSE
} from '../types';

export const signup = (firstname, lastname, matricNo, email, gender, department, faculty, level, password, error, success) => 
  Helpers.api(
  '/student/signup',
  'POST',
  {
    firstname,
    lastname,
    matricNo,
    email,
    gender,
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

export const updateStudent = (
  firstname,
  lastname,
  gender,
  department,
  faculty,
  level,
  error,
  success
) =>
  Helpers.api(
    "/student/update",
    "PATCH",
    {
      firstname,
      lastname,
      gender,
      department,
      faculty,
      level,
    },
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: STUDENT_UPDATE,
    }
  );

export const loadLookups = (error, success) =>
  Helpers.api(
    '/student/lookups',
    'GET',
    {},
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: LOOKUPS,
    }
  );

export const getCourses = (error, success) =>
  Helpers.api(
    "/student/courses",
    "GET",
    {},
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: COURSES,
    }
  );

export const registerCourse = (courseId, error, success) =>
  Helpers.api(
    `/course-registration/${courseId}/register`,
    "POST",
    {},
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: REGISTER_COURSE,
    }
  );

export const dropCourse = (courseId, error, success) =>
  Helpers.api(
    `/course-registration/${courseId}/drop`,
    "DELETE",
    {},
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
    }
  );

export const registerAllCourses = (error, success) =>
  Helpers.api(
    "/course-registration/registerr-all",
    "POST",
    {},
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
    }
  );
