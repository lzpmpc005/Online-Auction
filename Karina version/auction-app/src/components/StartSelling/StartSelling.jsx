import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getListings } from "../../api/auctions/auctions";
// import { Listing } from "../Listing/Listing";
import "./StartSelling.css";

const StartSelling = () => {
  const [listings, setListings] = useState([]);

  const normalizeDate = (date) => {
    return new Date(date).toLocaleString();
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listings = await getListings();
        console.log(listings);
        setListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="StartSelling">
      <div className="header">
        <h1>Start Selling Listings</h1>
        <p>
          You can choose a lot of listing and win something very expensive on
          cheap cost
        </p>
      </div>

      <div className="listings-panel">
        {listings.map((listing, index) => (
          <Card style={{ width: "20rem" }} key={index}>
            <Card.Img
              variant="top"
              src={"http://localhost:8000" + listing["product"].image}
            />
            <Card.Body>
              <Card.Title>{listing["product"].name}</Card.Title>
              <div className="button-info">
                <Link to={`/listings/${index}`} state={listing}>
                  <Button variant="light">Bid Now</Button>
                </Link>
                <span>{listing["product"].initial_price}</span>
              </div>
              <div className="date-info">
                <span>Start: {normalizeDate(listing.start_time)}</span>
                <span>End: {normalizeDate(listing.end_time)}</span>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StartSelling;
