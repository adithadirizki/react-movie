import { useEffect } from "react";
import MovieItem from "./MovieItem";
import ErrorMovie from "./utils/Error";
import SkeletonPreload from "./utils/SkeletonPreload";
import { connect, useDispatch } from "react-redux";
import { getTrendingTodayMovie, getTrendingThisWeekMovie } from "../actions";
import { SET_SELECTED_MENU } from "../actions/types";

const SetTrendingTodayMovie = (props) => {
  const { trendingTodayMovie, getTrendingTodayMovie } = props;
  const { page, total_pages } = trendingTodayMovie.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_SELECTED_MENU, payload: "Today" });
    getTrendingTodayMovie();
  }, []);

  const loadMore = () => {
    getTrendingTodayMovie();
  };

  if (trendingTodayMovie.error) {
    return <ErrorMovie />;
  }

  return (
    <>
      <h1 className="inline-block text-2xl font-ubuntu font-bold uppercase mb-8">
        TRENDING TODAY
        <div className="border border-gray-200 w-20 mt-2"></div>
      </h1>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {trendingTodayMovie.data.results.map((value, index) => {
          return <MovieItem movie={value} key={index} />;
        })}
        {trendingTodayMovie.loading ? <SkeletonPreload /> : null}
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

const SetTrendingThisWeekMovie = (props) => {
  const { trendingThisWeekMovie, getTrendingThisWeekMovie } = props;
  const { page, total_pages } = trendingThisWeekMovie.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_SELECTED_MENU, payload: "This Week" });
    getTrendingThisWeekMovie();
  }, []);

  const loadMore = () => {
    getTrendingThisWeekMovie();
  };

  if (trendingThisWeekMovie.error) {
    return <ErrorMovie />;
  }

  return (
    <>
      <h1 className="inline-block text-2xl font-ubuntu font-bold uppercase mb-8">
        TRENDING THIS WEEK
        <div className="border border-gray-200 w-20 mt-2"></div>
      </h1>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {trendingThisWeekMovie.data.results.map((value, index) => {
          return <MovieItem movie={value} key={index} />;
        })}
        {trendingThisWeekMovie.loading ? <SkeletonPreload /> : null}
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

const TrendingTodayMovie = connect(
  ({ trendingMovie }) => {
    return { trendingTodayMovie: trendingMovie[0] };
  },
  {
    getTrendingTodayMovie,
  }
)(SetTrendingTodayMovie);

const TrendingThisWeekMovie = connect(
  ({ trendingMovie }) => {
    return { trendingThisWeekMovie: trendingMovie[1] };
  },
  {
    getTrendingThisWeekMovie,
  }
)(SetTrendingThisWeekMovie);

export { TrendingTodayMovie, TrendingThisWeekMovie };
