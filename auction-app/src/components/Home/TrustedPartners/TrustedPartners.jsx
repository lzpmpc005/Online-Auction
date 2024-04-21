import { useState } from "react";
import "./TrustedPartners.css";

function TrustedPartners() {
  const [settings] = useState({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
  });

  const images = [
    "https://www.vectorlogo.zone/logos/google/google-ar21.png",
    "https://1000logos.net/wp-content/uploads/2017/06/Shell-Logo-1971.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1200px-Microsoft_logo_%282012%29.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1280px-Samsung_Logo.svg.png",
  ];
  return (
    <div className="trusted-partners">
      <div className="trusted-partners-container">
        <div className="trusted-partners-text">
          <h2>Trusted Partners</h2>
          <p>
            Partnered with industry leaders for secure transactions and
            authentic bid experiences.
          </p>
        </div>

        <div className="trusted-partners-images">
          {images.map((image) => (
            <div key={image}>
              <img src={image} className="h-12 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrustedPartners;
