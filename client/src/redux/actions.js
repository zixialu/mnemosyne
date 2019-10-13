import {
  SET_SESSION,
  CLEAR_SESSION,
} from './actionTypes';

export const setSession = session => ({
  type: SET_SESSION,
  payload: { session },
});

export const clearSession = () => ({
  type: CLEAR_SESSION,
  payload: { session: null },
});
