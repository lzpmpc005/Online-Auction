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

export async function getListingsByUser(id, token) {
  const response = await axios.get(`${BASE_URL}/auction/listings/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createListing(listing, token) {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  const formData = new FormData();
  formData.append("name", listing.name);
  formData.append("description", listing.description);
  formData.append("initial_price", listing.initial_price);
  formData.append("image", listing.image);

  const responseProduct = await axios.post(
    `${BASE_URL}/auction/add_product/`,
    formData,
    {
      headers: headers,
    }
  );

  if (!responseProduct) {
    return;
  }

  const response = await axios.post(
    `${BASE_URL}/auction/create/`,
    {
      start_time: listing.start_time,
      end_time: listing.end_time,
      product: responseProduct.data.id,
      current_price: listing.initial_price,
      seller: listing.seller,
    },
    {
      headers,
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteListing(id, token) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const response = await axios.delete(
    `${BASE_URL}/auction/listings/${id}/delete/`,
    { headers }
  );

  return response.status;
}
