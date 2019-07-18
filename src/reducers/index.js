import {
    ADD,
    DEL
  } from '../constants'
  
  const initialState = {
    tiger: 1000
  }

  const reducer  = (state = initialState, action) => {

    switch (action.type) {
        case ADD:
            return {
                ...state,
                tiger: state.tiger + 100
            };
        case DEL:
            return {
                ...state,
                tiger: state.tiger - 100
            };
        default:
            return state;
    }
  }
  
  export default reducer 