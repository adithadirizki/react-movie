import { useState } from "react";
import Loading from "./utils/Loading";
import Rating from "./utils/Rating";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";

const MovieItem = (props) => {
  const [loaded, setLoaded] = useState(false);
  const movieItem = props.movie;

  const PosterMovie = () => {
    if (movieItem.poster_path === null) {
      return (
        <FontAwesomeIcon
          icon={faFileImage}
          className="text-gray-200 min-w-full h-full"
        />
      );
    } else {
      return (
        <>
          <img
            className="rounded-lg h-full w-max mx-auto shadow-2xl transition duration-500 transform hover:scale-110"
            src={"https://image.tmdb.org/t/p/w154" + movieItem.poster_path}
            alt={movieItem.title}
            style={
              loaded
                ? {
                    objectFit: "cover",
                  }
                : {
                    display: "none",
                  }
            }
            onLoad={() => {
              setLoaded(true);
            }}
          />
          {loaded ? null : <Loading />}
        </>
      );
    }
  };

  return (
    <>
      <Link to={`/movie/${movieItem.id}`}>
        <div className="movie-item m-auto w-auto">
          <div
            className="movie-thumb flex flex-col h-auto m-auto"
            style={{
              height: "16rem",
            }}>
            <PosterMovie />
          </div>
          <div className="movie-content flex flex-col text-center py-2">
            <div className="movie-title font-montserrat font-bold text-sm md:text-base leading-5 mb-1">
              {movieItem.title}
            </div>

            <div className="movie-release font-lato text-sm text-gray-500 mb-2">
              {movieItem.release_date
                ? new Date(movieItem.release_date).toLocaleDateString()
                : "unknown date"}
            </div>

            <div className="movie-rating font-lato flex items-center mx-auto">
              <div className="inline-flex items-center space-x-1 mr-2">
                <Rating
                  vote_average={movieItem.vote_average}
                  className="text-sm"
                />
              </div>
              <span className="font-bold text-sm">
                {movieItem.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieItem;
