import { useState, useEffect } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";

import "./AuctionNavbar.css";

function AuctionNavbar() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <div className="bid-navbar-container">
      <Navbar expand="lg" className="bid-navbar">
        <Navbar.Brand href="/">BidMaster</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="#HowItWorks">How It Works</Nav.Link>
            <Nav.Link href="#link">Catergories</Nav.Link>
            <Nav.Link href="/listings">Start Selling</Nav.Link>
            {isAuth ? (
              <>
                <Nav.Link href="/my-cabinet">My Cabinet</Nav.Link>
                <Button href="/logout" className="button-link">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="button-link">Sign Up</Button>
                <Button href="/login" className="button-link">
                  Login
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AuctionNavbar;
