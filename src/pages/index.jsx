import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CatagoryFilter from "../components/catagory-filter";
import Pagination from "../components/pagination";
import ProductCard from "../components/product-card";
import { setItemsPerPage } from "../redux/filter/filter-slice";
import { fetchProducts } from "../redux/product/product-slice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const { itemsPerPage, searchKey } = useSelector((state) => state.filter);
  const { isLoaidng, products, isError, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (products.length < 1) {
      dispatch(fetchProducts());
    }
  }, []);

  const currentPage = page ? parseInt(page) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const filterdProduct = products.filter((item) =>
    item.title.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-4">
        <CatagoryFilter prouducts={products} />
        <div className="grid grid-cols-3 col-span-3 gap-4 mt-12">
          <div className="col-span-3">
            <label>Items per page: </label>
            <select
              defaultValue={itemsPerPage}
              onChange={(e) => dispatch(setItemsPerPage(e.target.value))}
              className="border p-3 rounded col-span-"
            >
              <option value="10">9</option>
              <option value="15">15</option>
              <option value="21">21</option>
            </select>
          </div>
          {isLoaidng ? (
            <div className="text-center col-span-3">Loading...</div>
          ) : isError ? (
            <p>{error}</p>
          ) : (
            <>
              {filterdProduct.slice(startIndex, endIndex).map((item, index) => {
                return <ProductCard {...item} key={index} />;
              })}

              <Pagination products={filterdProduct} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
