import { useEffect } from "react";
import MovieItem from "./MovieItem";
import SkeletonPreload from "./utils/SkeletonPreload";
import { connect } from "react-redux";
import { getGenreMovie } from "../actions";
import ErrorMovie from "./utils/Error";
import { useDispatch } from "react-redux";
import { CLEAR_GENRE_MOVIE, SET_SELECTED_MENU } from "../actions/types";

const GenreMovie = (props) => {
  const { match, genres, genreMovie, getGenreMovie } = props;
  const { page, total_pages } = genreMovie.data;
  const { genre } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_SELECTED_MENU, payload: genre });
    if (genres.data.length > 0) {
      const { id } = genres.data.find((value, index) => {
        return value.name === genre;
      });
      getGenreMovie(id);
    }
    return () => {
      dispatch({ type: CLEAR_GENRE_MOVIE });
    };
  }, [genre, genres]);

  // infinity scroll with button
  const loadMore = () => {
    getGenreMovie(genre);
  };

  if (genreMovie.error) {
    return <ErrorMovie />;
  }

  return (
    <>
      <h1 className="inline-block text-2xl font-ubuntu font-bold uppercase">
        {genre}
      </h1>
      <div className="font-lato tracking-wider text-lg mb-8">movie results :</div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {genreMovie.data.results.map((value, index) => {
          return <MovieItem movie={value} key={index} />;
        })}
        {genreMovie.loading ? <SkeletonPreload /> : null}
      </div>

      {page === total_pages ? null : (
        <div className="col-span-full text-center mt-6">
          <button
            className="font-montserrat border border-gray-400 rounded-full hover:text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-100 focus:border-transparent hover:shadow-lg transition duration-200 px-5 py-1"
            onClick={loadMore}>
            Load more...
          </button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ genres, genreMovie }) => {
  return { genres, genreMovie };
};

export default connect(mapStateToProps, { getGenreMovie })(GenreMovie);
