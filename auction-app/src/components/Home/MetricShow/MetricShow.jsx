import { Card } from "react-bootstrap";
import "./MetricShow.css";
function MetricShow() {
  const metrics = [
    {
      title: "100,000,000+",
      description: "Items Listed",
    },
    {
      title: "5,000,000+",
      description: "Happy Customers",
    },
    {
      title: "99.9%",
      description: "Auctions Completed",
    },
  ];

  return (
    <div className="metric-show-container">
      <h1 className="metric-show-header">By the Numbers</h1>
      <span className="metric-show-description">
        Numbers don't lie! Join the thousands who trust BidMaster for their
        auction needs. Check out our impressive stats.
      </span>

      <div className="metric-card-container">
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.title}>
            <h2>{metric.title}</h2>
            <p>{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MetricShow;
