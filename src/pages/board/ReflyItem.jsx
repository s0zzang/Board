import React from "react";
import PropTypes from "prop-types";

ReflyItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function ReflyItem({ item }) {
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <img
          className="w-8 mr-2"
          src={`https://market-lion.koyeb.app/api/files/${item.user.profile}`}
          alt=""
        />
        <a className="text-blue-500" href="">
          {item.user.name}
        </a>
        <time className="text-gray-500" dateTime={item.createdAt}>
          {item.createdAt}
        </time>
      </div>
      <pre className="whitespace-pre-wrap">{item.comment}</pre>
    </div>
  );
}

export default ReflyItem;
