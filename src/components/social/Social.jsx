import { useState, useEffect } from "react";
import axios from "axios";
import "./Social.css";

function Social({ loggedInUser }) {
  const [photos, setPhotos] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  const resizeImage = (imageUrl, width, height) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL());
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = imageUrl;
    });
  };

  const fetchPhotos = async () => {
    try {
      const response = await axios.get("https://api.unsplash.com/photos", {
        params: { client_id: "TFp5UtYD4CCICk19jAr0olUDGJnWQ8LXfDn5ZVvL2jk" },
      });

      const resizedPhotos = await Promise.all(
        response.data.map(async (photo) => {
          try {
            const resizedImageUrl = await resizeImage(
              photo.urls.regular,
              400,
              300
            );
            return {
              ...photo,
              urls: {
                ...photo.urls,
                regular: resizedImageUrl,
              },
            };
          } catch (error) {
            console.error("Error resizing image:", error);
            return photo;
          }
        })
      );

      setPhotos(resizedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleLike = async (photoId) => {
    try {
      await axios.post(
        `https://api.unsplash.com/photos/${photoId}/like`,
        {},
        {
          headers: {
            Authorization: "Bearer TFp5UtYD4CCICk19jAr0olUDGJnWQ8LXfDn5ZVvL2jk",
          },
        }
      );
      fetchPhotos();
    } catch (error) {
      console.error("Error liking photo:", error);
    }
  };

  const handleComment = async (photoId, comment) => {
    try {
      await axios.post(
        `https://api.unsplash.com/photos/${photoId}/comments`,
        {
          body: comment,
        },
        {
          headers: {
            Authorization: "Bearer TFp5UtYD4CCICk19jAr0olUDGJnWQ8LXfDn5ZVvL2jk",
          },
        }
      );
      fetchPhotos();
      setComment("");
    } catch (error) {
      console.error("Error commenting on photo:", error);
    }
  };

  return (
    <div className="social-container">
      <h1>Serge Media</h1>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-container">
            <img
              className="social-photo"
              src={photo.urls.regular}
              alt={photo.alt_description}
            />
            <div className="photo-details">
              <p>By: {photo.user.username}</p>
              <p>Likes: {photo.likes}</p>
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-input"
              />
              <button
                className="photo-button"
                onClick={() => handleComment(photo.id, comment)}
              >
                Post
              </button>
              <button onClick={() => handleLike(photo.id)}>Like</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Social;
