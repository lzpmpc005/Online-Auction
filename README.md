# eBid - Online Auction Platform

eBid is an emerging online auction platform designed to allow users to list auction items and enable real-time bidding.

## Features

1. **Create New Product Listings**: Sellers can create new listings for their products.
2. **Real-time Bidding**: Buyers can interact with the platform and place real-time bids.
3. **Event-Driven Timers**: Each auction is equipped with an event-driven timer.
4. **Determining Winning Bid**: At the end of the timer, the highest bid is determined as the winning bid.
5. **Notification System**: Sellers and winning bidders receive notifications.
6. **Comment and Rating System**: Buyers can submit comments and ratings.
7. **Seller Response**: Sellers can respond to comments.
8. **Real-time Display of Comments and Replies**: Comments and replies are displayed in real-time on the product listing page.
9. **Event-Driven Fee Adjustment**: Design algorithm to adjust listing fees based on platform requirements.
10. **Flash Sales**: Implement flash sales where selected items are sold at discounted prices for a limited time.
11. **Real-time Notifications**: Users receive real-time notifications about ongoing sales events and price adjustments.

## Installation

To install and run the eBid platform, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install` for the frontend and `pip install -r requirements.txt` for the backend.
4. Configure the database settings in `settings.py`.
5. Run migrations using `python manage.py migrate`.
6. Start the backend server using `python manage.py runserver`.
7. Start the frontend server using `npm start`.

## Usage

Once the servers are running, users can:
