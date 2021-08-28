import { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import SkeletonPreload from "./utils/SkeletonPreload";

const RecommendedMovie = (props) => {
  const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  };
  const [recommendedMovie, setRecommendedMovie] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { movieid } = props;

  const fetchMovie = () => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieid}/recommendations`, {
        params: {
          page: page,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
        },
      })
      .then((response) => {
        setRecommendedMovie({
          ...response.data,
          results: [...recommendedMovie.results, ...response.data.results],
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!movieid) {
      return false;
    }
    fetchMovie();
  }, [movieid, page]);

  return (
    <>
      <div className="recommended-movie py-8">
        <div className="recommended-title border-l-2 border-gray-300 text-gray-600 text-xl font-lato tracking-wider pl-4 mb-8">
          RECOMMENDED
        </div>
        <div className="recommended-list grid gap-x-4 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {recommendedMovie.results.map((value, index) => {
            return <MovieItem movie={value} key={index} />;
          })}

          {loading ? (
            <SkeletonPreload />
          ) : recommendedMovie.total_results === 0 ? (
            <div className="col-span-full text-center">
              <h3 className="text-3xl font-montserrat">Sorry!</h3>
              <p className="tracking-wider text-lg font-lato">
                There are no recommended movies...
              </p>
            </div>
          ) : null}

          {page === recommendedMovie.total_pages ? null : (
            <div className="col-span-full text-center mt-6">
              <button
                className="font-montserrat border border-gray-400 text-gray-600 rounded-full hover:bg-gray-200 hover:shadow-lg transition duration-200 px-5 py-1"
                onClick={() => {
                  setPage((state) => state + 1);
                }}>
                Load more...
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendedMovie;
