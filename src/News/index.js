import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Spinner } from "react-bootstrap";
import NewsItem from "./components/NewsItem";
import { loadNews } from "./actions/newsActions";
import getNews from "./selectors/newsSelectors";

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector(getNews);

  useEffect(() => {
    dispatch(loadNews());
  }, []);

  return (
    <div className="bootstrap-wrapper content-container">
      <Container>
        <Row>
          <Col>
            <h1 className="page-header">News</h1>
          </Col>
        </Row>
        <Row>
          {news && news.size ? (
            news.map(item => (
              <Col key={item.get("id")}>
                <Row>
                  <NewsItem name={item.get("name")} text={item.get("text")} />
                </Row>
              </Col>
            ))
          ) : (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default News;
