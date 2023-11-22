import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";

const RestaurantList = () => {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    fetch("https://nextjs-orpin-omega-98.vercel.app/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurantData(data));
  }, []);

  const groupByState = (data) => {
    return data.reduce((grouped, restaurant) => {
      const { state, restaurant_name } = restaurant;

      if (!grouped[state]) {
        grouped[state] = [];
      }

      grouped[state].push(restaurant_name);
      return grouped;
    }, {});
  };

  const renderStateOutput = () => {
    const groupedData = groupByState(restaurantData);

    return (
      <Container>
        <h1>Restaurants states wise</h1>

        {Object.entries(groupedData).map(([state, restaurants], index) => (
          <Row key={index} className="mb-4">
            <Col>
              <h2 style={{ textAlign: "start" }}>{state}</h2>
              <ul>
                {restaurants.map((restaurant, index) => (
                  <li key={index} style={{ textAlign: "start" }}>
                    {restaurant}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        ))}
      </Container>
    );
  };

  return <div>{renderStateOutput()}</div>;
};

export default RestaurantList;
