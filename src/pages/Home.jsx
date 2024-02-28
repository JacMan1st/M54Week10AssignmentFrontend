import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("https://api.unsplash.com/photos", {
          headers: {
            Authorization:
              "Client-ID qQQGmmQbKDUunBP7z-KoctFBxxQqZnFnV06Ad7cqcxU",
          },
        });
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div>
        {photos.map((photo) => (
          <img key={photo.id} src={photo.url} alt="Photo" />
        ))}
      </div>
    </div>
  );
}

export default Home;
