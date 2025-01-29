import React, { useEffect, useState } from "react";
import CustomCircularProgress from "../../../components/CustomCircularProgress";

const AddNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "pub_388315c80e0c4fa3e9c2a9fbeba0625cce9fe";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${apiKey}&q=nepali%20news&country=np`
        );
        const data = await response.json();
        if (response?.ok) {
          setNewsData(data?.results);
        } else {
          setError(data?.results);
        }
      } catch (error) {
        setError("Error fetching news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <CustomCircularProgress />}
      {error && (
        <p className="text-center text-danger">
          Error: No News Available Right Now
        </p>
      )}
      {!isLoading && !error && (
        <div className="container">
          <h1 className="text-center">Health News</h1>
          <div className="overflow-y-auto">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Published Date</th>
                  <th>Category</th>
                  <th>Language</th>
                  <th>Creator</th>
                </tr>
              </thead>
              <tbody>
                {newsData?.map((newsItem, index) => (
                  <tr key={index}>
                    <td>
                      {newsItem.image_url ? (
                        <img src={newsItem.image_url} height={50} width={50} />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      {newsItem?.title ? newsItem?.title : "Not Available"}
                    </td>
                    <td>
                      {newsItem?.pubDate ? newsItem?.pubDate : "Not Available"}
                    </td>
                    <td>
                      {newsItem?.category
                        ? newsItem?.category
                        : "Not Available"}
                    </td>
                    <td>
                      {newsItem?.language
                        ? newsItem?.language
                        : "Not Available"}
                    </td>
                    <td>
                      {newsItem?.creator ? newsItem?.creator : "Not Available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNews;
