import { fromJS } from "immutable";
import newsReducer from "../../reducers/newsReducer";
import { actionTypes } from "../../actions/newsActions";
import data from "../../../common/resource";

describe("News Reducer", () => {
  it("should update news in state", () => {
    const defaultState = fromJS([]);

    const payload = fromJS(data);
    const expected = fromJS(data);

    const action = {
      type: actionTypes.GET_NEWS,
      payload,
    };

    expect(newsReducer(defaultState, action)).toEqual(expected);
  });
});
