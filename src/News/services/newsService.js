import { fromJS } from "immutable";
import { get } from "../../common/services/NetService";
import configuration from "../../common/services/configurationService";

// eslint-disable-next-line import/prefer-default-export
export const getNews = async () =>
  fromJS(await get(`${configuration.URL_JSON}/newsList`));
