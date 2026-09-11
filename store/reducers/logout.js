export const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return state;

    default:
      return state;
  }
}
