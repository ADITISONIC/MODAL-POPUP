import { useEffect, useState } from "react";
import "./scroll.css";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl); // Corrected to use fetch, not fetchData
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data.products || []); // Assuming 'products' is the key in your API response
    } catch (e) {
      console.log(e);
      setErrorMessage("Failed to load data");
    } finally {
      setLoading(false);
    }
  }
  function handleScrollPercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );
    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrollPercentage((howMuchScrolled / height) * 100);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });
  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <div className="top-container">
        <div className="scroll-progress">
          <div
            className="current-progress"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <p>Rating: {item.rating}</p>
            <p>Stock: {item.stock}</p>
            <p>Brand: {item.brand}</p>
            <p>Warranty: {item.warrantyInformation}</p>
            <p>Availability Status: {item.availabilityStatus}</p>
            <h4>Reviews:</h4>
            <ul>
              {item.reviews.map((review, index) => (
                <li key={index}>
                  <p>
                    <strong>{review.reviewerName}</strong>: {review.comment}
                  </p>
                  <p>Rating: {review.rating}</p>
                  <p>{new Date(review.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
