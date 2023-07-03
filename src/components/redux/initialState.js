import {defaultStyles} from '../../constants';
import {storage} from '../../core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentState: '',
  currentStyles: defaultStyles,
}

const normalise = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state')
  ? normalise(storage('excel-state'))
  : defaultState;
