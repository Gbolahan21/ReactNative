import {
  ERROR,
  LOADING,
  CHECKIN,
  CHECKOUT,
  TODAY_ATTENDANCE,
  ATTENDANCE_HISTORY,
} from "../types";

const initialState = {
  loading: [],
  today: [],
  checkin: null,
  history: [],
  page: 1,
  totalPages: 1,
  totalRecords: 0,
  error: null,
};

export default function attendance(
  state = initialState,
  action
) {
  const { loading } = state;
  const { payload } = action;

  switch (action.type) {

    case LOADING:
      return {
        ...state,

        loading: loading.includes(payload)
          ? loading.filter((item) => item !== payload)
          : [...loading, payload],
      };

    case CHECKIN:
      return {
        ...state,
        checkin: payload,
        error: null,
      };

    case CHECKOUT:
      return {
        ...state,
        error: null,
      };

    case TODAY_ATTENDANCE:
      return {
        ...state,
        today: Array.isArray(payload)
          ? payload
          : [],
        error: null,
      };

    case ATTENDANCE_HISTORY:
      return {
        ...state,
        history: payload.records,
        page: payload.page,
        totalPages: payload.totalPages,
        totalRecords: payload.totalRecords,
        error: null,
      };

    case ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}