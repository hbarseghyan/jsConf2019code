import React from "react";
import { shallow } from "enzyme";
import NewsItem from "../../components/NewsItem";

describe("NewsItem", () => {
  const props = { name: "test 1", text: "text 2" };
  it("should render a card", () => {
    expect(shallow(<NewsItem {...props} />)).toMatchSnapshot();
  });
});
