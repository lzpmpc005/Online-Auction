import { Image, Row, Col, Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./Listing.css";

const Listing = () => {
  const { name, description, image, initial_price, start_date, end_date } =
    useLocation().state;

  return (
    <>
      <div className="listing-container">
        <Row>
          <div className="listing-header">
            <h1>{name}</h1>
          </div>
        </Row>

        <div className="listing-body">
          <Row>
            <Col sm="3">
              <div className="listing-active-users">
                <h3>Customers</h3>
              </div>
            </Col>

            <Col sm="6">
              <div className="listing-info">
                <div className="listing-image">
                  <Image src={image} />
                </div>
                <div className="listing-description">
                  <p>{description}</p>
                </div>
              </div>
            </Col>

            <Col sm="3">
              <div className="listing-bids">
                <div className="listing-active-bids">
                  <h3>Active Bids</h3>
                </div>
                <div className="listing-bid-form">
                  <h3>COST: {initial_price}</h3>
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
