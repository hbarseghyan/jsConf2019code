import React from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import newsItems from "./News/reducers/newsReducer";
import News from "./News";

const rootReducer = combineReducers({
  newsItems,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const App = () => {
  return (
    <div className="main-container">
      <Provider store={store}>
        <News />
      </Provider>
    </div>
  );
};

export default App;
