import * as Helpers from '../../helpers';

import {
  LOGOUT,
} from '../types';

export const logout = () => (dispatch) => {
  Helpers.token.remove();

  dispatch({
    type: LOGOUT,
  });
};
