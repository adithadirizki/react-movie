import { useEffect } from "react";
import MovieItem from "./MovieItem";
import SkeletonPreload from "./utils/SkeletonPreload";
import { connect } from "react-redux";
import { getTopRatedMovie } from "../actions";
import ErrorMovie from "./utils/Error";
import { useDispatch } from "react-redux";
import { SET_SELECTED_MENU } from "../actions/types";

const TopRatedMovie = ({ topRatedMovie, getTopRatedMovie }) => {
  const { page, total_pages } = topRatedMovie.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_SELECTED_MENU, payload: "Top Rated" });
    getTopRatedMovie();
  }, []);

  // infinity scroll with button
  const loadMore = () => {
    getTopRatedMovie();
  };

  if (topRatedMovie.error) {
    return <ErrorMovie />;
  }

  return (
    <>
      <h1 className="inline-block text-2xl font-ubuntu font-bold uppercase mb-8">
        TOP RATED
        <div className="border border-gray-200 w-20 mt-2"></div>
      </h1>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {topRatedMovie.data.results.map((value, index) => {
          return <MovieItem movie={value} key={index} />;
        })}
        {topRatedMovie.loading ? <SkeletonPreload /> : null}
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

const mapStateToProps = ({ topRatedMovie }) => {
  return { topRatedMovie };
};

export default connect(mapStateToProps, { getTopRatedMovie })(TopRatedMovie);
