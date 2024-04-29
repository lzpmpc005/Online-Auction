import "./OurServices.css";

export default function OurServices() {
  const services = [
    {
      icon: "bi bi-fire",
      name: "Instant Valuation",
      description:
        "Get immediate estimates on your items with our AI-driven valuation tool. Know your item's worth in seconds.",
    },
    {
      icon: "bi bi-clock-fill",
      name: "Advanced Search",
      description:
        "Filter through the auction listings with ease using our intelligent search features to find exactly what you're looking for.",
    },
    {
      icon: "bi bi-cloud-fill",
      name: "Watchlist",
      description:
        "Keep an eye on items that pique your interest and never miss a bidding opportunity with our personalized watchlist.",
    },
  ];

  return (
    <div className="our-services-container">
      <h1 className="our-services-header">Our Services</h1>
      <p className="our-services-description">
        Explore a variety of services that pave your way to auction success,
        both as a buyer and a seller.
      </p>

      <div className="our-services-card-container">
        {services.map((service) => (
          <div className="our-services-card" key={service.name}>
            <i className={service.icon}></i>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
