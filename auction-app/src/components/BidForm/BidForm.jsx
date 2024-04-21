import { useState } from "react";

function BidForm({ onBid }) {
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (amount <= 0) {
      setError("Bid amount must be greater than 0.");
      return;
    }
    onBid(amount);
    setBidAmount("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Placing a bid:
        <input
          type="number"
          value={bidAmount}
          onChange={(event) => setBidAmount(event.target.value)}
        />
      </label>
      <button type="submit">Bid</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default BidForm;
