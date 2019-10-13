import { SET_SESSION, CLEAR_SESSION } from '../actionTypes';

const initialState = {
  session: localStorage.getItem('session') || null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SESSION: {
      const { session } = action.payload;
      return {
        ...state,
        session,
      };
    }

    case CLEAR_SESSION: {
      return {
        ...state,
        session: null,
      };
    }

    default: {
      return state;
    }
  }
}
