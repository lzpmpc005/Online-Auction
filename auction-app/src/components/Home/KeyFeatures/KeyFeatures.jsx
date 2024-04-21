import { Image, Button } from "react-bootstrap";
import "./KeyFeatures.css";

function KeyFeatures() {
  const features = [
    {
      title: "24/7 Support",
      icon: "glyphicon glyphicon-briefcase",
      description: "We are always available to help. Call us anytime.",
    },
    {
      title: "Mobile Bidding",
      icon: "bi bi-envelope",
      description: "Stay in the action from anywhere with our responsive mobile platform – never miss a bid!",
    },
    {
      title: "Secure Pay",
      icon: "glyphicon glyphicon-bell",
      description: "Feel safe with each transaction. Our secure system protects your payments and profits.",
    },
  ];

  return (
    <div className="key-features-container">
      <div className="key-features-card">
        <div className="key-features-card-text">
          <div className="key-features-header">
            <h2>Key Features</h2>
            <p>
              Discover BidMaster's innovative tools designed to make buying and
              selling at auction easy and exciting.
            </p>
          </div>

          <ul className="key-features-list">
            {features.map((feature) => (
              <li key={feature.title}>
                <i className={feature.icon} />
                <div className="key-features-list-item">
                  <h3>- {feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <Button variant="light" className="key-features-button">Learn More</Button>
        </div>
        <div className="key-features-card-image">
          <Image
            src="https://i.pinimg.com/564x/c1/97/a9/c197a9bffe86a989d3beabd41f36da93.jpg"
            className="key-features-image"
          />
        </div>
      </div>
    </div>
  );
}

export default KeyFeatures;
