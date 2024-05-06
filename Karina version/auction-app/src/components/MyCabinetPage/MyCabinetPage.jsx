import { useEffect, useState } from "react";
import "./MyCabinetPage.css";
import {
  createListing,
  getListingsByUser,
  deleteListing,
} from "../../api/auctions/auctions";
import Button from "../Button/Button";
import { Modal } from "react-bootstrap";

export default function MyCabinetPage() {
  const [myListings, setMyListings] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const baseUrl = "http://localhost:8000";
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("access_token");
        const listings = await getListingsByUser(user_id, token);
        console.log(listings);
        setMyListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  const addListing = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);

    const listing = {
      name: formProps.name,
      description: formProps.description,
      image: formProps.image,
      start_time: formProps.start_time,
      end_time: formProps.end_time,
      initial_price: formProps.initial_price,
      seller: localStorage.getItem("user_id"),
    };

    const token = localStorage.getItem("access_token");
    const response = createListing(listing, token);
    setMyListings([...myListings, response]);
  };

  const delete_listing = (id) => {
    const token = localStorage.getItem("access_token");
    deleteListing(id, token)
      .then((status) => {
        console.log(status);
        if (status == 204) {
          const newData = myListings.filter((item) => item.id !== id);
          setMyListings(newData);
        }
      })
      .catch((error) => {
        return;
      });
  };

  return (
    <div className="my-cabinet-page">
      <h1>My Personal Cabinet</h1>
      <Button
        variant={"light"}
        className="my-cabinet-create-listing"
        onClick={() => setShowModal(true)}
      >
        <span>Create Listing</span>
      </Button>
      <h2>My Listings</h2>
      <div className="my-cabinet-listings">
        {myListings.length === 0 ? (
          <p>You don't have any listings yet</p>
        ) : (
          myListings.map((listing) => (
            <div className="my-cabinet-listing" key={listing.id}>
              <h3>{listing.product.name}</h3>
              <img
                src={baseUrl + listing.product.image}
                alt={listing.product.name}
              ></img>
              <p className="my-cabinet-description">
                {listing.product.description}
              </p>

              <div className="my-cabinet-buttons-settings">
                <Button variant={"light"} className="my-cabinet-update-listing">
                  <span>Update</span>
                </Button>

                <Button
                  variant={"light"}
                  className="my-cabinet-delete-listing"
                  onClick={() => delete_listing(listing.id)}
                >
                  <span>Delete</span>
                </Button>
              </div>
              <p>{listing.current_price}</p>
            </div>
          ))
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="my-cabinet-form" onSubmit={addListing}>
            <input type="text" placeholder="Name" name="name" required />
            <textarea
              placeholder="Description"
              name="description"
              required
            ></textarea>
            <input
              type="text"
              placeholder="Initial price"
              name="initial_price"
              required
            />
            <input
              type="datetime-local"
              placeholder="Start time"
              name="start_time"
              required
            />
            <input
              type="datetime-local"
              placeholder="End time"
              name="end_time"
            />
            <input type="file" placeholder="Image" name="image" required />
            <button>Save Changes</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
