import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/error";
import Loading from "../components/loading";
import Pagination from "../components/pagination";
import ProductCard from "../components/product-card";
import Sidebar from "../components/sidebar";
import { useFetchProduct } from "../hook/useFetchProduct";
import { setItemsPerPage, setSort } from "../redux/filter/filter-slice";

export default function Dashboard() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();
  const { isError, isLoading, error, products } = useFetchProduct();
  const { itemsPerPage, searchKey, catagories, brands, range, rating, sort } =
    useSelector((state) => state.filter);
  const currentPage = page ? parseInt(page) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const filterdProduct = products
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchKey.toLowerCase()) &&
        (catagories.length === 0 || catagories.includes(item.category)) &&
        (brands.length === 0 || brands.includes(item.brand)) &&
        item.price >= range.min &&
        item.price <= range.max &&
        item.rating <= rating
    )
    .sort((a, b) => {
      if (sort === "asc") {
        return a.price - b.price;
      } else if (sort === "desc") {
        return b.price - a.price;
      } else {
        return a.id - b.id;
      }
    });

  if (isLoading) {
    return <Loading />;
  }

  if (isError && !isLoading) {
    return <Error error={error} />;
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
                value={itemsPerPage}
                onChange={(e) => {
                  dispatch(setItemsPerPage(e.target.value));
                  navigator("/");
                }}
                className="border p-3 rounded inline-block mr-4"
              >
                <option value="10">9</option>
                <option value="15">15</option>
                <option value="21">21</option>
              </select>
              price sorting
              <select
                value={sort}
                onChange={(e) => {
                  dispatch(setSort(e.target.value));
                  navigator("/");
                }}
                className="border p-3 rounded"
              >
                <option value="">none</option>
                <option value="desc">Price: High to low</option>
                <option value="asc">Price: Low to low</option>
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
