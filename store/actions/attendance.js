import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  CHECKIN,
  CHECKOUT,
  TODAY_ATTENDANCE,
  ATTENDANCE_HISTORY
} from "../types";

export const checkin = (studentId, error, success) =>
  Helpers.api(
    "/attendance/checkin",
    "POST",
    {
      studentId,
    },
    {
      error,
      success,
    },
    {
      error: ERROR,
      loading: LOADING,
      responder: CHECKIN,
    }
  );

export const checkout = (studentId, error, success) =>
  Helpers.api(
    "/attendance/checkout",
    "POST",
    { studentId },
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: CHECKOUT,
    }
  );

export const todayAttendance = (studentId, error, success) =>
  Helpers.api(
    `/attendance/today/${studentId}`,
    "GET",
    {},
    {
      error,
      success,
    },
    {
      error: ERROR,
      loading: LOADING,
      responder: TODAY_ATTENDANCE,
    }
  );

export const attendanceHistory = (
  studentId,
  page = 1,
  limit = 10,
  error,
  success
) =>
  Helpers.api(
    `/attendance/history/${studentId}?page=${page}&limit=${limit}`,
    "GET",
    {},
    {
      error,
      success,
    },
    {
      error: ERROR,
      loading: LOADING,
      responder: ATTENDANCE_HISTORY,
    }
  );