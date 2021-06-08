import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fromJS } from "immutable";
import { loadNews, updateNews } from "../../actions/newsActions";
import data from "../../../common/resource";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const NEWS_SERVICE_PATH = "../../services/newsService";
// eslint-disable-next-line import/no-dynamic-require
const newsService = require(NEWS_SERVICE_PATH);

const result = fromJS(data);

const expected = fromJS(data);

const store = mockStore(
  fromJS({
    news: [],
  })
);

describe("newsActions", () => {
  beforeEach(() => jest.unmock(NEWS_SERVICE_PATH));

  it("should load all news", () => {
    newsService.getNews = jest
      .fn()
      .mockImplementation(() => Promise.resolve(result));

    return store.dispatch(loadNews()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(updateNews(expected));
    });
  });
});
