import { getNews } from "../services/newsService";

export const actionTypes = {
  GET_NEWS: "GET_NEWS",
};

export const updateNews = payload => ({
  type: actionTypes.GET_NEWS,
  payload,
});

export const loadNews = () => async dispatch => {
  const res = await getNews();
  dispatch(updateNews(res));
};
