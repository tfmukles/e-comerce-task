import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Pagination = ({ products }) => {
  const { itemsPerPage } = useSelector((state) => state.filter);
  const { page } = useParams();
  const currentPage = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  return (
    <ul className="text-center space-x-2 flex justify-center items-center py-5 col-span-3">
      {hasPrevPage && (
        <li>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            to={indexPageLink ? "/" : `/products/page/${currentPage - 1}`}
          >
            Prev
          </Link>
        </li>
      )}

      {[...Array(6).keys()].map((_, i) => {
        if (currentPage + i + 1 > totalPages) {
          return null;
        }

        return (
          <li key={i}>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              to={`${
                indexPageLink ? "/" : `/products/page/${currentPage + i + 1}`
              }`}
            >
              {currentPage + i + 1}
            </Link>
          </li>
        );
      })}

      {hasNextPage && (
        <li>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            to={`/products/page/${currentPage + 1}`}
          >
            Next
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
