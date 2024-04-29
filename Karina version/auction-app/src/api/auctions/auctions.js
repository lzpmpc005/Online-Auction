import axios from "axios";
const BASE_URL = import.meta.env.VITE_AUCTIONS_API_URL;

export async function getListings() {
  const response = await axios.get(`${BASE_URL}/auction/listings/`);
  return response.data;
}

export async function getListing(id) {
  const response = await axios.get(`${BASE_URL}/auction/listings/${id}`);
  return response.data;
}

export async function createListing(listing) {
  const response = await fetch(`${BASE_URL}/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listing),
  });
  const data = await response.json();
  return data;
}
