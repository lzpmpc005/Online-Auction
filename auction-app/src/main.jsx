import React from "react";
import ReactDOM from "react-dom/client";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";

import { RouterProvider, createBrowserRouter, Route } from "react-router-dom";

import AuctionNavbar from "./components/Navbar/AuctionNavbar";
import AuctionFooter from "./components/Footer/AuctionFooter";
import Home from "./components/Home/Home";
import StartSelling from "./components/StartSelling/StartSelling";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import Listing from "./components/Listing/Listing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/listings",
    element: <StartSelling />,
  },
  {
    path: "/listings/:id",
    element: <Listing />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <AuctionNavbar />
            <RouterProvider router={router} />
            <AuctionFooter />
          </Col>
        </Row>
      </Container>
    </>
  </React.StrictMode>
);
