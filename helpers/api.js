import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { BASE_URL } from '../config/config';

import token from './token';

const api =
  (url, method, data, {success, error}, actionTypes) =>
  async (dispatch) => {
    const {
      responder,
      loading,
      error: errorConstant,
    } = actionTypes;

    dispatch({
      payload: url,
      type: loading,
    });

    try {
      const storedToken = await token.get();

      const headers = {
        'Content-Type': 'application/json',
      };

      if (storedToken) {
        headers.Authorization = `Bearer ${storedToken}`;
      }

      const response = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        headers,
      });

      if (response.data?.token) {
        await token.set(response.data.token);
      }

      dispatch({
        payload: url,
        type: loading,
      });

      dispatch({
        payload: response.data,
        type: responder,
      });

      if (typeof success === 'function') {
        success(response.data, dispatch);
      }

      return true;

    } catch (e) {

      dispatch({
        payload: url,
        type: loading,
      });

      dispatch({
        errorObj: e,
        payload: e.response?.data,
        type: errorConstant,
      });

      if (typeof error === 'function') {
        error(e.response?.data, dispatch);
      }

      if (e.response?.status === 401) {
        await token.remove();
      }

      const storedToken = await token.get();

      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);

          if (decoded.exp * 1000 < Date.now()) {
            await token.remove();
          }
        } catch (decodeError) {
          console.log('Invalid token');
          await token.remove();
        }
      }

      return false;
    }
  };

export default api;