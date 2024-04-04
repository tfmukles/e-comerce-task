import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Pagination = ({ products }) => {
  const { itemsPerPage } = useSelector((state) => state.filter);
  const { page } = useParams();
  const currentPage = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  return (
    products.length > 0 && (
      <div className="text-center col-span-3 w-full my-3">
        <ul className="pagination">
          <li>
            <Link to={hasPrevPage ? `/products/page/${currentPage - 1}` : "/"}>
              Prev
            </Link>
          </li>
          {[...Array(totalPages).keys()].map((_, i) => {
            const isActive = currentPage === i + 1;
            const href = i === 0 ? "/" : `/products/page/${i + 1}`;
            return (
              <li key={i}>
                <Link className={isActive ? "active" : ""} to={href}>
                  {i + 1}
                </Link>
              </li>
            );
          })}

          <li>
            <Link to={hasNextPage ? `/products/page/${currentPage + 1}` : "/"}>
              Next
            </Link>
          </li>
        </ul>
      </div>
    )
  );
};

export default Pagination;
