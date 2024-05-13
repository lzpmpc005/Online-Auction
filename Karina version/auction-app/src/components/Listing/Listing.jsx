import { useState, useEffect } from "react";
import { Image, Row, Col, Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./Listing.css";
import { createBid } from "../../api/auctions/auctions";

const Listing = () => {
  const { id, current_price, product, seller, start_time, end_time } =
    useLocation().state;

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [ws, setWs] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(current_price);
  const [bidsList, setBidsList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    const newWs = new WebSocket(
      "ws://localhost:8000/ws/presence/" + username + "/" + id + "/"
    );

    newWs.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setCurrentPrice(message.current_price || current_price);
      setBidsList(message.all_bids || []);
      if (message.users) {
        setBidsList(message.all_bids || []);
        setCurrentPrice(message.current_price || current_price);
        setOnlineUsers([...message.users]);
      }
    };

    setWs(newWs);

    return () => {
      if (newWs) {
        newWs.close();
      }
    };
  }, []);

  const makeBid = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(currentPrice);
    if (Number(formProps.amount) < Number(currentPrice)) {
      setError("Bid amount must be greater than current price");
      return;
    }
    setError("");

    const bid = {
      action: "bid",
      amount: formProps.amount,
      listing: id,
      user: localStorage.getItem("user_id"),
    };
    console.log(bid);
    if (ws && ws.readyState === WebSocket.OPEN) {
      createBid(ws, bid);
    }

    e.target.reset();
  };

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
                  <ul>
                    {bidsList
                      .map((bid, index) => <li key={index}>{bid}</li>)
                      .reverse()}
                  </ul>
                </div>
                {error && <div className="listing-error">{error}</div>}

                <div className="listing-bid-form">
                  <h3>COST: {currentPrice}</h3>
                  <Form onSubmit={makeBid}>
                    <Form.Group className="mb-3" controlId="yourBid">
                      <Form.Label>Your Bid</Form.Label>
                      <Form.Control
                        type="number"
                        name="amount"
                        placeholder={+currentPrice + 50}
                        required
                      />
                      <Button variant="success" className="my-3" type="submit">
                        Place Bid
                      </Button>
                    </Form.Group>
                  </Form>
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
