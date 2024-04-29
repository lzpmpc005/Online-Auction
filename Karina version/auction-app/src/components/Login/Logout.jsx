import { useEffect } from "react";
import axios from "axios";

export default function Logout() {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/logout/",
          {
            refresh_token: localStorage.getItem("refresh_token"),
            access_token: localStorage.getItem("access_token"),
          },
          {
            headers: { "Content-Type": "application/json" },
          },
          { withCredentials: true }
        );

        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <></>;
}
