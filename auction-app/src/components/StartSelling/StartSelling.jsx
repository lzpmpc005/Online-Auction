import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { Listing } from "../Listing/Listing";
import "./StartSelling.css";

const StartSelling = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = [
          {
            name: "Oil Painting - Sunset at Sea",
            description:
              "Beautiful oil painting depicting a mesmerizing sunset over the ocean. The vibrant colors and intricate details make it a stunning addition to any art collection.",
            image: "https://afremov.com/media/catalog/product/image_2299.jpeg",
            initial_price: 500,
            start_date: "2024-05-01T10:00:00Z",
            end_date: "2024-05-07T18:00:00Z",
          },
          {
            name: "Antique Pocket Watch",
            description:
              "Exquisite antique pocket watch crafted in the 19th century. The intricate design and precision mechanics make it a rare find for collectors.",
            image:
              "https://www.sellingantiques.co.uk/photosnew/dealer_vintagewristwatch/dealer_vintagewristwatch_superhighres_1693997880082-9513293325.jpg",
            initial_price: 800,
            start_date: "2024-05-03T09:00:00Z",
            end_date: "2024-05-10T17:00:00Z",
          },
          {
            name: "Vintage Leather Suitcase",
            description:
              "Authentic vintage leather suitcase from the 1950s. Its timeless design and sturdy construction make it both a stylish accessory and a practical travel companion.",
            image:
              "https://www.englishtraditions.com/cdn/shop/products/108MM24-D.jpg?v=1493934088",
            initial_price: 300,
            start_date: "2024-05-05T08:00:00Z",
            end_date: "2024-05-12T16:00:00Z",
          },
          {
            name: "Rare Stamp Collection",
            description:
              "Rare collection of stamps from around the world, featuring unique designs and historical significance. A must-have for philatelists and history enthusiasts.",
            image:
              "https://i.pinimg.com/564x/59/24/61/5924618517a2d348a61f6a4f8ad13e3d.jpg",
            initial_price: 1000,
            start_date: "2024-05-07T11:00:00Z",
            end_date: "2024-05-14T15:00:00Z",
          },
          {
            name: "Vintage Gibson Guitar",
            description:
              "Classic vintage Gibson guitar from the 1960s. Known for its rich tone and iconic design, this instrument is a timeless piece of music history.",
            image:
              "https://images.guitarguitar.co.uk/cdn/large/110/11122213424158b_01.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
            initial_price: 1500,
            start_date: "2024-05-09T13:00:00Z",
            end_date: "2024-05-16T14:00:00Z",
          },
          {
            name: "Rare Diamond Ring",
            description:
              "Exquisite diamond ring featuring a rare and flawless diamond. Its elegant design and unparalleled beauty make it a truly exceptional piece of jewelry.",
            image:
              "https://d2d22nphq0yz8t.cloudfront.net/35aee99d-95d9-46a2-9030-ab04199b35ba/https://images.allurez.com/productimages/large/26176L-108-SP-14R.jpg",
            initial_price: 2000,
            start_date: "2024-05-11T12:00:00Z",
            end_date: "2024-05-18T12:00:00Z",
          },
        ];
        setListings(data);
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
            <Card.Img variant="top" src={listing.image} />
            <Card.Body>
              <Card.Title>{listing.name}</Card.Title>
              <div className="button-info">
                <Link to={`/listings/${index}`} state={listing}>
                  <Button variant="light">Bid Now</Button>
                </Link>
                <span>{listing.initial_price}</span>
              </div>
              <div className="date-info">
                <span>Start: {listing.start_date}</span>
                <span>End: {listing.end_date}</span>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StartSelling;
