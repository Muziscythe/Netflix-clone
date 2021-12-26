import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios, { imageUrl } from "../axios";

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState();

  useEffect(() => {
    async function bannerMovie() {
      const request = await axios.get(fetchUrl);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    bannerMovie();
  }, [fetchUrl]);
  // console.log(movie);

  function description(str, len) {
    return str?.length > len ? str.substr(0, len - 1) + "..." : str;
  }

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imageUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center"
      }}
      className="banner"
    >
      <div className="banner__container">
        <h1>{movie?.title || movie?.name || movie?.original_title}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <p>{description(movie?.overview, 150)}</p>
      </div>
      <div className="banner__bottom"></div>
    </div>
  );
}

export default Banner;
