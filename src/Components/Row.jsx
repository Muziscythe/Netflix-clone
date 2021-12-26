import React, { useEffect, useState } from "react";
import "./Row.css";
import axios, { imageUrl } from "../axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isFirstRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState("");

  useEffect(() => {
    async function getMovies() {
      const request = await axios.get(fetchUrl);
      // console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    getMovies();
  }, [fetchUrl]);
  // console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  };

  const handleClick = (movie) => {
    console.log(movie);

    if (trailerId) {
      setTrailerId("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerId(urlParams.get("v"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies?.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isFirstRow && "row__firstRow"}`}
              src={`${imageUrl}${
                isFirstRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt="poster-image"
            />
          );
        })}
      </div>
      {trailerId && <Youtube videoId={trailerId} opts={opts} />}
    </div>
  );
}

export default Row;
