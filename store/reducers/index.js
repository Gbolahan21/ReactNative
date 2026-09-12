import {combineReducers} from 'redux';

import student from './student';
import attendance from './attendance';
export default combineReducers({
  student,
  attendance,
});