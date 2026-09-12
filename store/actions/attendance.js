import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  CHECKIN,
  CHECKOUT,
  TODAY_ATTENDANCE,
  ATTENDANCE_HISTORY
} from "../types";

export const checkin = (userId, error, success) =>
  Helpers.api(
    "/attendance/checkin",
    "POST",
    {
      userId,
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

export const checkout = (userId, error, success) =>
  Helpers.api(
    "/attendance/checkout",
    "POST",
    { userId },
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: CHECKOUT,
    }
  );

export const todayAttendance = (userId, error, success) =>
  Helpers.api(
    `/attendance/today/${userId}`,
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
  userId,
  page = 1,
  limit = 10,
  error,
  success
) =>
  Helpers.api(
    `/attendance/history/${userId}?page=${page}&limit=${limit}`,
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