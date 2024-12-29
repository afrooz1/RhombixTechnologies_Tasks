import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

function LikedMusic() {
  const musicContext = useContext(MusicContext);
  const { likedMusic, setLikedMusic } = musicContext;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
    setLikedMusic(localLikedMusic);
    setLoading(false); // Simulate loading completion
  }, [setLikedMusic]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {likedMusic.length === 0 ? (
        <div className="container text-center py-5">
          <h3 className="mb-4">You don't have any liked music yet!</h3>
          <div className="mb-4">
            <i className="bi bi-emoji-frown fs-1 text-secondary"></i>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = "/")}
          >
            Explore Music
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-danger text-center py-3">
            Your Liked Music <i className="bi bi-heart-fill text-danger"></i>
          </h1>
          <div className="container">
            <div className="row">
              {likedMusic.map((element) => (
                <Card key={element.id} element={element} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LikedMusic;
