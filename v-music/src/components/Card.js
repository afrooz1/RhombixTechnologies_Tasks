import React, { useContext, useEffect } from "react";
import { MusicContext } from "../Context";

function Card({ element }) {
  const musicContext = useContext(MusicContext);
  const { likedMusic, setLikedMusic, pinnedMusic, setPinnedMusic, addlist, setAddList } = musicContext;

  const handlePin = () => {
    let pinnedMusic = JSON.parse(localStorage.getItem("pinnedMusic")) || [];
    let updatedPinnedMusic = [];

    if (pinnedMusic.some((item) => item.id === element.id)) {
      updatedPinnedMusic = pinnedMusic.filter((item) => item.id !== element.id);
    } else {
      if (pinnedMusic.length >= 10) {
        alert("You can pin a maximum of 10 songs!");
        return;
      }
      updatedPinnedMusic = [...pinnedMusic, element];
    }
    setPinnedMusic(updatedPinnedMusic);
    localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
  };

  const handleLike = () => {
    let likedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
    let updatedLikedMusic = [];

    if (likedMusic.some((item) => item.id === element.id)) {
      updatedLikedMusic = likedMusic.filter((item) => item.id !== element.id);
    } else {
      updatedLikedMusic = [...likedMusic, element];
    }
    setLikedMusic(updatedLikedMusic);
    localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
  };

  useEffect(() => {
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
    setLikedMusic(localLikedMusic);
  }, [setLikedMusic]);

  return (
    <div key={element.id} className="col-lg-3 col-md-6 py-3">
      <div className="card music-card shadow-sm">
        <div className="card-image ratio ratio-1x1">
          <img
            src={element.album.images[0].url}
            className="card-img-top rounded-top"
            alt={element.name}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between align-items-center">
            <span>{element.name}</span>
            <div className="d-flex gap-2">
              <button
                onClick={handlePin}
                className={`btn ${
                  pinnedMusic.some((item) => item.id === element.id)
                    ? "btn-success"
                    : "btn-outline-success"
                } btn-sm`}
                title={pinnedMusic.some((item) => item.id === element.id) ? "Unpin" : "Pin"}
              >
                <i
                  className={`bi ${
                    pinnedMusic.some((item) => item.id === element.id)
                      ? "bi-pin-angle-fill"
                      : "bi-pin-angle"
                  }`}
                ></i>
              </button>
              <button
                onClick={handleLike}
                className={`btn ${
                  likedMusic.some((item) => item.id === element.id)
                    ? "btn-danger"
                    : "btn-outline-danger"
                } btn-sm`}
                title={likedMusic.some((item) => item.id === element.id) ? "Unlike" : "Like"}
              >
                <i
                  className={`bi ${
                    likedMusic.some((item) => item.id === element.id)
                      ? "bi-heart-fill"
                      : "bi-heart"
                  }`}
                ></i>
              </button>
              
            </div>
          </h5>
          <p className="card-text text-truncate">
            <strong>Artist:</strong> {element.album.artists[0].name}
          </p>
          <p className="card-text">
            <strong>Release:</strong> {element.album.release_date}
          </p>
         
          <audio
            src={element.preview_url}
            controls
            className="w-100 rounded"
            title="Preview"
          ></audio>
          

        </div>

      </div>

    </div>
  );
}

export default Card;
