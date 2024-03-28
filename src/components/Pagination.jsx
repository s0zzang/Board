import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";

Pagination.propTypes = {
  totalPage: PropTypes.number,
  current: PropTypes.number,
};

function Pagination({ totalPage, current }) {
  const pageList = [];
  const [searchParams] = useSearchParams();

  for (let page = 1; page <= totalPage; page++) {
    searchParams.set("page", page);
    let search = searchParams.toString();

    pageList.push(
      <li key={page}>
        <Link
          className={current === page && "text-semibold text-blue-700"}
          to={`/boards?${search}`}
        >
          {page}
        </Link>
      </li>
    );
  }

  return (
    <div>
      <ul className="flex flex-wrap justify-center gap-3 m-4">{pageList}</ul>
    </div>
  );
}

export default Pagination;
