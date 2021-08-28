import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as faStarFilled,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

const Rating = (props) => {
  const vote_average = Math.floor(props.vote_average / 0.5) * 0.5;
  return [2, 4, 6, 8, 10].map((value, index) => {
    if (value <= vote_average) {
      return (
        <FontAwesomeIcon
          icon={faStarFilled}
          className={"text-yellow-400 mx-0.5 " + props.className}
          key={index}
        />
      );
    } else if (vote_average >= value - 2 && vote_average % 2 !== 0) {
      return (
        <FontAwesomeIcon
          icon={faStarHalfAlt}
          className={"text-yellow-400 " + props.className}
          key={index}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faStar}
          className={"text-yellow-400 " + props.className}
          key={index}
        />
      );
    }
  });
};

export default Rating;
