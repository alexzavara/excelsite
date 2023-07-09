import {defaultStyles, defaultTitle} from '../../constants';
import {clone} from '../../core/utils';

const defaultState = {
  title: defaultTitle,
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

export function normaliseInitialState(state) {
  return state ? normalise(state) : clone(defaultState);
}
