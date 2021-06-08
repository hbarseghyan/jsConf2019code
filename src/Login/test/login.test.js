import React from "react";
import { shallow } from "enzyme";
import Login from "..";
import * as loginActions from "../actions/loginActions";

describe("Login", () => {
  let login;
  beforeEach(() => {
    jest.unmock("../actions/loginActions");

    loginActions.login = jest.fn();

    login = shallow(<Login />);
    login.find("form").simulate("submit", {});
  });

  it("renders properly", () => {
    expect(login).toMatchSnapshot();
  });

  it("call login", () => {
    expect(loginActions.login).toHaveBeenCalled();
  });
});
