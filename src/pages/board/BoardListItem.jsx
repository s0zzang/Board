import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

BoardListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function BoardListItem({ item }) {
  const navigate = useNavigate();
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out">
      <td className="p-3">{item._id}</td>
      <td
        className="p-3 truncate indent-4"
        onClick={() => navigate(`/boards/${item._id}`)}
      >
        <Link to={`/boards/${item._id}`}>
          {item.title}{" "}
          <span className="text-gray-500">({item.repliesCount || 0})</span>
        </Link>
      </td>
      <td className="p-3 truncate">{item.user.name}</td>
      <td className="p-3 sm:table-cell">{item.views}</td>
      <td className="p-3 hidden sm:table-cell">{item.createdAt}</td>
    </tr>
  );
}

export default BoardListItem;
