import {
  ERROR,
  LOADING,
  CHECKIN,
  TODAY_ATTENDANCE,
  ATTENDANCE_HISTORY,
} from "../types";

const initialState = {
  loading: [],
  today: null,
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
        today: {
          status: "Present",
          ...payload,
        },
        error: null,
      };

    case TODAY_ATTENDANCE:
      return {
        ...state,
        today: payload,
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