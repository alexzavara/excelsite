import {defaultStyles} from '../../constants';
import {storage} from '../../core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentState: '',
  currentStyles: defaultStyles
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
