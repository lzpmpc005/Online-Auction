import { NavLink } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";

import "./AuctionNavbar.css";

function AuctionNavbar() {
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
            <Button>Sign Up</Button>
            <Button>Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AuctionNavbar;
