import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

function PinnedMusic() {
  const musicContext = useContext(MusicContext);
  const { pinnedMusic, setPinnedMusic } = musicContext;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const localPinnedMusic = JSON.parse(localStorage.getItem("pinnedMusic")) || [];
    setPinnedMusic(localPinnedMusic);
    setLoading(false); // Stop the loading spinner once data is loaded
  }, [setPinnedMusic]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {pinnedMusic.length === 0 ? (
        <div className="container text-center py-5">
          <h3 className="mb-4">You don't have any pinned music yet!</h3>
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
          <h1 className="text-primary text-center py-3">
            Your Pinned Music <i className="bi bi-pin-angle-fill"></i>
          </h1>
          <div className="container">
            <div className="row">
              {pinnedMusic.map((element) => (
                <Card key={element.id} element={element} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PinnedMusic;
