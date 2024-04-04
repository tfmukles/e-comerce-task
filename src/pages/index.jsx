import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "../components/pagination";
import ProductCard from "../components/product-card";
import Sidebar from "../components/sidebar";
import { setItemsPerPage } from "../redux/filter/filter-slice";
import {
  fetchProducts,
  productSelectors,
} from "../redux/product/product-slice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const products = useSelector(productSelectors.selectAll);
  const { itemsPerPage, searchKey, catagories, brands, range, rating } =
    useSelector((state) => state.filter);
  const { isLoading, isError, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (products.length < 1) {
      dispatch(fetchProducts());
    }
  }, []);

  const currentPage = page ? parseInt(page) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const filterdProduct = products.filter(
    (item) =>
      item.title.toLowerCase().includes(searchKey.toLowerCase()) &&
      (catagories.length === 0 || catagories.includes(item.category)) &&
      (brands.length === 0 || brands.includes(item.brand)) &&
      item.price >= range.min &&
      item.price <= range.max &&
      item.rating <= rating
  );

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="animate-spin w-5 h-5" />
        <p>Loading...</p>
      </div>
    );
  }

  if (isError && !isLoading) {
    return <div className="text-red-500 text-xl">{error}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-4 gap-4">
          <Sidebar products={products} />
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

            <>
              {filterdProduct.length === 0 && !isLoading ? (
                <div className="text-center col-span-3">
                  <h1 className="text-red-500 text-xl font-semibold">
                    No products found
                  </h1>
                </div>
              ) : (
                filterdProduct
                  .slice(startIndex, endIndex)
                  .map((item, index) => {
                    return <ProductCard {...item} key={index} />;
                  })
              )}

              <Pagination products={filterdProduct} />
            </>
          </div>
        </div>
      </div>
    </>
  );
}
