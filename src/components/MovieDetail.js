import { useEffect, useState } from "react";
import Loading from "./utils/Loading";
import Rating from "./utils/Rating";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faPlay,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import RecommendedMovie from "./RecommendedMovie";

const MovieDetail = (props) => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getDetailMovie = async () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });

    await axios
      .get(`https://api.themoviedb.org/3/movie/${props.match.params.id}`, {
        params: {
          append_to_response: "videos",
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
        },
      })
      .then((response) => {
        setMovieDetail(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setIsError(true);
      });
  };

  const keyTrailer = () => {
    const videos = movieDetail.videos ? movieDetail.videos.results : [];
    if (videos.length === 0) {
      return false;
    }

    const video = videos.find((video, index) => {
      return video.type === "Trailer" && video.site === "YouTube";
    });

    if (!video) {
      return false;
    }

    return video.key;
  };

  const toggleTrailer = () => {
    return setOpened((state) => (state ? false : true));
  };

  useEffect(() => {
    setLoaded(false)
    getDetailMovie();
    return () => {
      setLoading(true);
      setOpened(false);
      setIsError(false);
    };
  }, [props.match.params.id]);

  const PosterMovie = () => {
    if (movieDetail.poster_path === null) {
      return (
        <FontAwesomeIcon
          icon={faFileImage}
          className="text-gray-200 min-w-full h-full"
        />
      );
    } else {
      return (
        <>
          {loaded ? null : (
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-1/2"
                style={{
                transform: 'translate(-50%, -50%)'
              }}>
                <Loading />
              </div>
            </div>
          )}
          <img
            className="rounded-t shadow-2xl bg-center bg-no-repeat w-full mx-auto"
            src={"https://image.tmdb.org/t/p/w342" + movieDetail.poster_path}
            alt={movieDetail.title}
            style={{ objectFit: "cover" }}
            onLoad={() => setLoaded(true)}
          />
        </>
      );
    }
  };

  if (loading) {
    return (
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          transform: "translate(-50%, -50%)",
        }}>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8">
        <div className="text-center text-4xl font-lato tracking-wide mb-8">
          Something went wrong!
        </div>
        <svg
          id="a706cf1c-1654-439b-8fcf-310eb7aa0e00"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="300px"
          viewBox="0 0 1120.59226 777.91584">
          <circle cx="212.59226" cy="103" r="64" fill="#ff6584" />
          <path
            d="M563.68016,404.16381c0,151.01141-89.77389,203.73895-200.51559,203.73895S162.649,555.17522,162.649,404.16381,363.16457,61.04208,363.16457,61.04208,563.68016,253.1524,563.68016,404.16381Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#f2f2f2"
          />
          <polygon
            points="316.156 523.761 318.21 397.378 403.674 241.024 318.532 377.552 319.455 320.725 378.357 207.605 319.699 305.687 319.699 305.687 321.359 203.481 384.433 113.423 321.621 187.409 322.658 0 316.138 248.096 316.674 237.861 252.547 139.704 315.646 257.508 309.671 371.654 309.493 368.625 235.565 265.329 309.269 379.328 308.522 393.603 308.388 393.818 308.449 394.99 293.29 684.589 313.544 684.589 315.974 535.005 389.496 421.285 316.156 523.761"
            fill="#3f3d56"
          />
          <path
            d="M1160.29613,466.01367c0,123.61-73.4842,166.77-164.13156,166.77s-164.13156-43.16-164.13156-166.77S996.16457,185.15218,996.16457,185.15218,1160.29613,342.40364,1160.29613,466.01367Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#f2f2f2"
          />
          <polygon
            points="950.482 552.833 952.162 449.383 1022.119 321.4 952.426 433.154 953.182 386.639 1001.396 294.044 953.382 374.329 953.382 374.329 954.741 290.669 1006.369 216.952 954.954 277.514 955.804 124.11 950.467 327.188 950.906 318.811 898.414 238.464 950.064 334.893 945.173 428.327 945.027 425.847 884.514 341.294 944.844 434.608 944.232 446.293 944.123 446.469 944.173 447.428 931.764 684.478 948.343 684.478 950.332 562.037 1010.514 468.952 950.482 552.833"
            fill="#3f3d56"
          />
          <ellipse
            cx="554.59226"
            cy="680.47903"
            rx="554.59226"
            ry="28.03433"
            fill="#3f3d56"
          />
          <ellipse
            cx="892.44491"
            cy="726.79663"
            rx="94.98858"
            ry="4.80162"
            fill="#3f3d56"
          />
          <ellipse
            cx="548.71959"
            cy="773.11422"
            rx="94.98858"
            ry="4.80162"
            fill="#3f3d56"
          />
          <ellipse
            cx="287.94432"
            cy="734.27887"
            rx="217.01436"
            ry="10.96996"
            fill="#3f3d56"
          />
          <circle cx="97.08375" cy="566.26982" r="79" fill="#2f2e41" />
          <rect
            x="99.80546"
            y="689.02332"
            width="24"
            height="43"
            transform="translate(-31.32451 -62.31008) rotate(0.67509)"
            fill="#2f2e41"
          />
          <rect
            x="147.80213"
            y="689.58887"
            width="24"
            height="43"
            transform="translate(-31.31452 -62.87555) rotate(0.67509)"
            fill="#2f2e41"
          />
          <ellipse
            cx="119.54569"
            cy="732.61606"
            rx="7.5"
            ry="20"
            transform="translate(-654.1319 782.47948) rotate(-89.32491)"
            fill="#2f2e41"
          />
          <ellipse
            cx="167.55414"
            cy="732.18168"
            rx="7.5"
            ry="20"
            transform="translate(-606.25475 830.05533) rotate(-89.32491)"
            fill="#2f2e41"
          />
          <circle cx="99.31925" cy="546.29477" r="27" fill="#fff" />
          <circle cx="99.31925" cy="546.29477" r="9" fill="#3f3d56" />
          <path
            d="M61.02588,552.94636c-6.04185-28.64075,14.68758-57.26483,46.30049-63.93367s62.13813,11.14292,68.18,39.78367-14.97834,38.93-46.59124,45.59886S67.06774,581.58712,61.02588,552.94636Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#6c63ff"
          />
          <path
            d="M257.29613,671.38411c0,55.07585-32.73985,74.3063-73.13,74.3063q-1.40351,0-2.80255-.0312c-1.87139-.04011-3.72494-.1292-5.55619-.254-36.45135-2.57979-64.77127-22.79937-64.77127-74.02113,0-53.00843,67.73872-119.89612,72.827-124.84633l.00892-.00889c.19608-.19159.29409-.28516.29409-.28516S257.29613,616.30827,257.29613,671.38411Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#6c63ff"
          />
          <path
            d="M181.50168,737.26482l26.747-37.37367-26.81386,41.4773-.07125,4.29076c-1.87139-.04011-3.72494-.1292-5.55619-.254l2.88282-55.10258-.0223-.42775.049-.0802.27179-5.20415-26.88076-41.5798,26.96539,37.67668.06244,1.105,2.17874-41.63324-23.0132-42.96551,23.29391,35.6583,2.26789-86.31419.00892-.294v.28516l-.37871,68.064,22.91079-26.98321-23.00435,32.84678-.60595,37.27566L204.18523,621.958l-21.4805,41.259-.33863,20.723,31.05561-49.79149-31.17146,57.023Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#3f3d56"
          />
          <circle cx="712.48505" cy="565.41532" r="79" fill="#2f2e41" />
          <rect
            x="741.77716"
            y="691.82355"
            width="24"
            height="43"
            transform="translate(-215.99457 191.86399) rotate(-17.08345)"
            fill="#2f2e41"
          />
          <rect
            x="787.6593"
            y="677.72286"
            width="24"
            height="43"
            transform="matrix(0.95588, -0.29376, 0.29376, 0.95588, -209.82788, 204.72037)"
            fill="#2f2e41"
          />
          <ellipse
            cx="767.887"
            cy="732.00275"
            rx="20"
            ry="7.5"
            transform="translate(-220.8593 196.83312) rotate(-17.08345)"
            fill="#2f2e41"
          />
          <ellipse
            cx="813.47537"
            cy="716.94619"
            rx="20"
            ry="7.5"
            transform="translate(-214.42477 209.56103) rotate(-17.08345)"
            fill="#2f2e41"
          />
          <circle cx="708.52153" cy="545.71023" r="27" fill="#fff" />
          <circle cx="708.52153" cy="545.71023" r="9" fill="#3f3d56" />
          <path
            d="M657.35526,578.74316c-14.48957-25.43323-3.47841-59.016,24.59412-75.0092s62.57592-8.34055,77.06549,17.09268-2.39072,41.6435-30.46325,57.63671S671.84483,604.17639,657.35526,578.74316Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#6c63ff"
          />
          <path
            d="M611.29613,661.29875c0,50.55711-30.05368,68.20979-67.13,68.20979q-1.28835,0-2.57261-.02864c-1.71785-.03682-3.41933-.1186-5.10033-.23313-33.46068-2.36813-59.45707-20.92878-59.45707-67.948,0-48.65932,62.18106-110.05916,66.85186-114.60322l.00819-.00817c.18-.17587.27-.26177.27-.26177S611.29613,610.74164,611.29613,661.29875Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#6c63ff"
          />
          <path
            d="M541.72029,721.77424l24.55253-34.30732-24.6139,38.07426-.0654,3.93872c-1.71785-.03682-3.41933-.1186-5.10033-.23313l2.6463-50.58165-.02047-.39266.045-.07361.24949-4.77718-24.67531-38.16836,24.753,34.58547.05731,1.01433,2-38.21741-21.12507-39.44039L541.80616,625.928l2.08182-79.23247.00819-.26994v.26177l-.34764,62.47962,21.031-24.76934-21.11693,30.15184-.55624,34.21735,19.63634-32.839-19.71812,37.87389-.31085,19.0228,28.50763-45.70631-28.614,52.34448Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#3f3d56"
          />
          <path
            d="M875.29613,682.38411c0,55.07585-32.73985,74.3063-73.13,74.3063q-1.4035,0-2.80255-.0312c-1.87139-.04011-3.72494-.1292-5.55619-.254-36.45135-2.57979-64.77127-22.79937-64.77127-74.02113,0-53.00843,67.73872-119.89612,72.827-124.84633l.00892-.00889c.19608-.19159.29409-.28516.29409-.28516S875.29613,627.30827,875.29613,682.38411Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#6c63ff"
          />
          <path
            d="M799.50168,748.26482l26.747-37.37367-26.81386,41.4773-.07125,4.29076c-1.87139-.04011-3.72494-.1292-5.55619-.254l2.88282-55.10258-.0223-.42775.049-.0802.27179-5.20415L770.108,654.01076l26.96539,37.67668.06244,1.105,2.17874-41.63324-23.0132-42.96551,23.29391,35.6583,2.26789-86.31419.00892-.294v.28516l-.37871,68.064,22.91079-26.98321-23.00435,32.84678-.606,37.27566L822.18523,632.958l-21.4805,41.259-.33863,20.723,31.05561-49.79149-31.17146,57.023Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#3f3d56"
          />
          <ellipse
            cx="721.51694"
            cy="656.82212"
            rx="12.40027"
            ry="39.5"
            transform="translate(-220.83517 966.22323) rotate(-64.62574)"
            fill="#2f2e41"
          />
          <ellipse
            cx="112.51694"
            cy="651.82212"
            rx="12.40027"
            ry="39.5"
            transform="translate(-574.07936 452.71367) rotate(-68.15829)"
            fill="#2f2e41"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="movie-detail grid grid-cols-3 gap-x-8 lg:px-8">
        <div className="movie-thumb col-span-full flex flex-col md:col-span-1 mx-auto w-2/3 sm:w-1/2 md:w-full mb-6">
          <PosterMovie />
          {keyTrailer() ? (
            <div className="flex-grow flex-shrink">
              <button
                className="play-movie inline-flex items-center text-lg bg-gray-600 hover:bg-gray-500 transition duration-200 rounded-b-md hover:shadow-xl justify-center w-full p-4"
                onClick={toggleTrailer}>
                <FontAwesomeIcon icon={faPlay} className="text-white mr-4" />
                <span className="text-white text-sm border-l border-gray-400 uppercase font-bold font-ubuntu pl-4">
                  Play Trailer
                </span>
              </button>
            </div>
          ) : null}
        </div>
        <div className="movie-content col-span-full md:col-span-2 font-montserrat">
          <h2 className="movie-title text-2xl md:text-3xl font-bold">
            {movieDetail.title}
          </h2>
          <h3 className="movie-tagline italic mb-2">{movieDetail.tagline}</h3>
          <div className="more-detail flex flex-wrap items-center space-x-4 space-y-1 font-lato text-sm text-gray-400 mb-8">
            <span className="ratings" title="Ratings">
              <div className="inline-flex items-center mr-2">
                <Rating vote_average={movieDetail.vote_average} />
              </div>
              <span>
                <strong>{movieDetail.vote_average}</strong> of{" "}
                <strong>{movieDetail.vote_count}</strong> votes
              </span>
            </span>
            <span
              className="release-date flex items-center"
              title="Release date">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-xs mr-1" />
              {movieDetail.release_date
                ? new Date(movieDetail.release_date).toLocaleDateString()
                : "unknown date"}
            </span>
            <span className="duration flex items-center" title="Duration">
              <FontAwesomeIcon icon={faClock} className="text-xs mr-1" />
              {movieDetail.runtime} min
            </span>
          </div>
          <div className="movie-ref mb-8">
            <h3 className="ref-title font-bold font-ubuntu text-gray-500 uppercase mb-2">
              Visit
            </h3>
            <div className="ref-link flex flex-wrap space-x-2">
              <a
                href={movieDetail.homepage}
                target="_blank"
                className="website-homepage inline-flex items-center text-sm border border-gray-200 hover:shadow-lg hover:bg-gray-600 hover:text-white transition duration-300 rounded-md px-3 py-2"
                rel="noreferrer">
                <span className="px-4">Homepage</span>
              </a>
              <a
                href={`https://www.imdb.com/title/${movieDetail.imdb_id}`}
                target="_blank"
                className="website-homepage inline-flex items-center text-sm border border-gray-200 hover:shadow-lg hover:bg-gray-600 hover:text-white transition duration-300 rounded-md px-3 py-2"
                rel="noreferrer">
                <span className="px-4">IMDB</span>
              </a>
            </div>
          </div>
          <div className="movie-overview mb-8">
            <h3 className="overview-title font-bold font-ubuntu text-gray-500 uppercase mb-2">
              Overview
            </h3>
            <div className="overview-content text-gray-600">
              {movieDetail.overview ? (
                movieDetail.overview
              ) : (
                <div className="italic text-sm">Don't have overview</div>
              )}
            </div>
          </div>
          <div className="movie-genres">
            <h3 className="genres-title font-bold font-ubuntu text-gray-500 uppercase mb-2">
              Genres
            </h3>
            <div className="genre-list flex flex-wrap items-center">
              {movieDetail.genres.length > 0
                ? movieDetail.genres.map((genre, index) => {
                    return (
                      <Link
                        to={`/genre/${genre.name}`}
                        key={index}
                        className="border border-gray-500 text-xs rounded-full hover:bg-gray-600 hover:text-white transition duration-500 py-1.5 px-3 mb-2 mr-2">
                        {genre.name}
                      </Link>
                    );
                  })
                : "-"}
            </div>
          </div>
        </div>
        {keyTrailer() && opened ? (
          <div
            className="modal-video fixed top-0 left-0 w-full h-full z-50 cursor-pointer"
            style={{
              backgroundColor: "#000000cc",
            }}
            onClick={() => {
              setOpened(false);
            }}>
            <div
              className="modal-wrapper w-full h-full mx-auto table"
              style={{
                maxWidth: "940px",
              }}>
              <div className="modal-body table-cell align-middle w-full h-full">
                <div
                  className="modal-content w-full h-0 relative"
                  style={{
                    paddingBottom: "56.25%",
                  }}>
                  <button
                    className="absolute z-10 inline-block"
                    style={{
                      top: "-40px",
                      right: "-25px",
                    }}
                    onClick={() => {
                      setOpened(false);
                    }}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-3xl text-gray-400 w-10 h-10"
                    />
                  </button>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    width="460"
                    height="230"
                    title={movieDetail.title}
                    src={`//www.youtube.com/embed/${keyTrailer()}?autoplay=1&hl=en&modestbranding=1&fs=1&autohide=1`}
                    frameBorder="0"
                    allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <RecommendedMovie movieid={movieDetail.id} />
    </>
  );
};

export default MovieDetail;
