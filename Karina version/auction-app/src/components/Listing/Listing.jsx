import { useState, useEffect } from "react";
import { Image, Row, Col, Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./Listing.css";

const Listing = () => {
  const { id, current_price, product, seller, start_time, end_time } =
    useLocation().state;

  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const ws = new WebSocket(
      "ws://localhost:8000/ws/presence/" + username + "/"
    );

    ws.onopen = () => {
      console.log("connected");
      ws.send(JSON.stringify({ username: username }));
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setOnlineUsers(message.users);
    };

    return () => {
      ws.close();
      setOnlineUsers([]);
    };
  }, []);

  return (
    <>
      <div className="listing-container">
        <Row>
          <div className="listing-header">
            <h1>{product.name}</h1>
          </div>
        </Row>

        <div className="listing-body">
          <Row>
            <Col sm="3">
              <div className="listing-active-users">
                <h3>Customers</h3>

                <ul>
                  {onlineUsers.map((user, index) => (
                    <li key={index}>{user}</li>
                  ))}
                </ul>
              </div>
            </Col>

            <Col sm="6">
              <div className="listing-info">
                <div className="listing-image">
                  <Image src={"http://localhost:8000" + product.image} />
                </div>
                <div className="listing-description">
                  <p>{product.description}</p>
                </div>
              </div>
            </Col>

            <Col sm="3">
              <div className="listing-bids">
                <div className="listing-active-bids">
                  <h3>Active Bids</h3>
                </div>
                <div className="listing-bid-form">
                  <h3>COST: {current_price}</h3>
                  <Form>
                    <Form.Group className="mb-3" controlId="yourBid">
                      <Form.Label>Your Bid</Form.Label>
                      <Form.Control type="number" />
                    </Form.Group>
                  </Form>
                  <Button variant="success">Place Bid</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Listing;
