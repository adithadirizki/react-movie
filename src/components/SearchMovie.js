import { useEffect } from "react";
import MovieItem from "./MovieItem";
import ErrorMovie from "./utils/Error";
import SkeletonPreload from "./utils/SkeletonPreload";
import { connect, useDispatch } from "react-redux";
import { getSearchMovie } from "../actions";
import { CLEAR_SEARCH_MOVIE } from "../actions/types";

const SearchMovie = (props) => {
  const { match, searchMovie, getSearchMovie } = props;
  const { page, total_pages } = searchMovie.data;
  const { query } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    getSearchMovie(query);
    return () => {
      dispatch({ type: CLEAR_SEARCH_MOVIE });
    };
  }, [query]);

  const loadMore = () => {
    getSearchMovie(query);
  };

  if (searchMovie.error) {
    return <ErrorMovie />;
  }

  return (
    <>
      <div className="search-title text-lg font-ubuntu border-b border-gray-200 inline-block pb-2 mb-8">
        <h1 className="search-query text-2xl font-bold uppercase">"{query}"</h1>
        search results:
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {searchMovie.data.results.map((value, index) => {
          return <MovieItem movie={value} key={index} />;
        })}
        {searchMovie.loading ? <SkeletonPreload /> : null}
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

const mapStateToProps = ({ searchMovie }) => {
  return { searchMovie };
};

export default connect(mapStateToProps, { getSearchMovie })(SearchMovie);
