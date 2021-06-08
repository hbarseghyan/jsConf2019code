import React from "react";
import PropTypes from "prop-types";

import { Card } from "react-bootstrap";

const NewsItem = ({ name, text }) => {
  return (
    <Card className="customer-card" style={{ width: "16rem" }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>
          <small className="s-muted">{text}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

NewsItem.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NewsItem;
