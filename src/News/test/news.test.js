import React from "react";
import * as reactRedux from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { fromJS } from "immutable";
import { shallow, mount } from "enzyme";
import * as newsAction from "../actions/newsActions";
import data from "../../common/resource";

import News from "..";
import { wrap } from "module";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("News", () => {
  describe("News loaded", () => {
    let wrapper;
    beforeEach(() => {
      jest.unmock("react-redux");

      reactRedux.useDispatch = jest.fn().mockImplementation(call => {
        const dispatch = () => call;
        return dispatch;
      });
      reactRedux.useSelector = jest.fn().mockImplementation(() => fromJS(data));
      // jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => fromJS(data));

      wrapper = shallow(<News />);
      console.log(wrapper.debug());
    });

    it("should call useDispatch", () => {
      expect(reactRedux.useDispatch).toHaveBeenCalled();
    });

    it("should call useSelector", () => {
      expect(reactRedux.useSelector).toHaveBeenCalled();
    });

    it("should render a cards", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("showld render 5 cards", () => {
      expect(wrapper.find("NewsItem")).toHaveLength(5);
    });

    it("showld render at list one cards", () => {
      expect(wrapper.exists("NewsItem")).toBe(true);
    });

    it("showld render list with props", () => {
      expect(
        wrapper
          .find("NewsItem")
          .first()
          .prop("text")
      ).toEqual("news text ");
    });
  });
  describe("News loaded with store", () => {
    let wrapper;
    let store;
    beforeEach(() => {
      store = mockStore(
        fromJS({
          news: [],
        })
      );
      store.dispatch = jest.fn();
      jest.unmock("../actions/newsActions");
      newsAction.loadNews = jest.fn();

      wrapper = mount(
        <reactRedux.Provider store={store}>
          <News />
        </reactRedux.Provider>
      );
    });

    it("should call dispatch", () => {
      console.log(wrapper);
      expect(newsAction.loadNews).toHaveBeenCalledTimes(1);
    });
  });

  describe("News preloading", () => {
    let wrapper;
    beforeEach(() => {
      jest.unmock("react-redux");
      reactRedux.useDispatch = jest.fn();
      reactRedux.useSelector = jest.fn();
      wrapper = shallow(<News />);
    });
    it("showld renders preloader", () => {
      expect(wrapper.find(".sr-only").text()).toEqual("Loading...");
    });
  });
});
