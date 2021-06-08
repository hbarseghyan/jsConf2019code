import { fromJS } from "immutable";
import { actionTypes } from "../actions/newsActions";

const defaultState = fromJS([]);

const newsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_NEWS:
      return state.merge(action.payload);
    default:
      return state;
  }
};

export default newsReducer;
